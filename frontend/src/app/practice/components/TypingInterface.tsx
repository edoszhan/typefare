"use client";

import { useState, useEffect, useRef } from 'react';
import { RotateCcw } from "lucide-react";
import WordDisplay from './WordDisplay';
import UtilityBar from './UtilityBar';
import { 
  WordState, 
  TypingStats, 
  generateWords, 
  initializeWordStates, 
  calculateWPM, 
  calculateAccuracy, 
  estimateWordCount,
  getWordPool,
  generateWordsFromPool
} from '../utils/typingUtils';

interface TypingInterfaceProps {
  timeSeconds: number;
  onFinish: (stats: TypingStats) => void;
  onRestart: () => void;
  onTimerClick: () => void;
}

type SessionState = 'idle' | 'typing' | 'finished';

export default function TypingInterface({ timeSeconds, onFinish, onRestart, onTimerClick }: TypingInterfaceProps) {
  const [words, setWords] = useState<WordState[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // We no longer use a separate input; typing happens directly on the words
  const [timeRemaining, setTimeRemaining] = useState(timeSeconds);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  // Visible window: show 3 lines of words, each with fixed wordsPerLine
  const [wordsVisibleStart, setWordsVisibleStart] = useState(0);
  const wordsPerLine = 10;
  const visibleLines = 3;

  // Utility bar state
  const [toggles, setToggles] = useState({
    punctuation: false,
    numbers: false,
    time: false,
    words: true, // Default to true since we're using words
  });
  const [activeDuration, setActiveDuration] = useState(timeSeconds);
  const durations = [15, 30, 60];

  // Initialize words when component mounts or duration changes
  useEffect(() => {
    const wordCount = estimateWordCount(activeDuration);
    const pool = getWordPool({ punctuation: toggles.punctuation, numbers: toggles.numbers });
    const wordList = generateWordsFromPool(wordCount, pool);
    const wordStates = initializeWordStates(wordList);
    setWords(wordStates);
    setTimeRemaining(activeDuration);
    setCurrentWordIndex(0);
    setIsActive(false);
    setIsCompleted(false);
    setSessionState('idle');
    setStartTime(null);
    setWordsVisibleStart(0);
  }, [activeDuration, toggles.punctuation, toggles.numbers]);

  // Timer countdown - only when active and not completed
  useEffect(() => {
    if (!isActive || timeRemaining <= 0 || isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          setSessionState('finished');
          // End the practice and compute stats when time runs out
          setTimeout(() => {
            if (!isCompleted) {
              finishPractice();
            }
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining, isCompleted]);

  const startPractice = () => {
    setIsActive(true);
    setSessionState('typing');
    setStartTime(Date.now());
    containerRef.current?.focus();
  };

  const restartPractice = () => {
    const wordCount = estimateWordCount(activeDuration);
    const pool = getWordPool({ punctuation: toggles.punctuation, numbers: toggles.numbers });
    const wordList = generateWordsFromPool(wordCount, pool);
    const wordStates = initializeWordStates(wordList);
    setWords(wordStates);
    setTimeRemaining(activeDuration);
    setCurrentWordIndex(0);
    setIsActive(false);
    setIsCompleted(false);
    setSessionState('idle');
    setStartTime(null);
    setWordsVisibleStart(0);
    // Keep focus on container for immediate typing after restart
    setTimeout(() => containerRef.current?.focus(), 0);
  };

  const finishPractice = () => {
    setIsActive(false);
    setIsCompleted(true);
    setSessionState('finished');
    
    const correctWords = words.filter(word => word.isCorrect).length;
    const completedWords = words.filter(word => word.isCompleted).length;
    const elapsedTime = startTime ? (Date.now() - startTime) / 1000 : timeSeconds;
    
    const stats: TypingStats = {
      wpm: calculateWPM(completedWords, elapsedTime),
      accuracy: calculateAccuracy(correctWords, completedWords),
      timeElapsed: elapsedTime,
      wordsCompleted: completedWords,
      totalWords: words.length,
    };
    
    onFinish(stats);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isCompleted) return;

    if (!isActive) {
      startPractice();
    }

    const updatedWords = [...words];
    const currentWord = updatedWords[currentWordIndex];
    if (!currentWord) return;

    // Prevent Tab from leaving the container
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }

    // Space is handled in onKeyUp for advancing; do not append it
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      return;
    }

    // Backspace: remove last character, do not go to previous word
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (currentWord.userInput.length > 0) {
        currentWord.userInput = currentWord.userInput.slice(0, -1);
        setWords(updatedWords);
      }
      return;
    }

    // Ignore modifier keys, arrows, etc.
    if (e.key.length !== 1) {
      return;
    }

    // Restart on Tab + Enter
    if (e.key === 'Enter' && (e as any).shiftKey) {
      e.preventDefault();
      restartPractice();
      return;
    }

    // Append typed character
    currentWord.userInput = (currentWord.userInput || '') + e.key;
    setWords(updatedWords);

    // Do not auto-advance; require Space on correct word
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (isCompleted) return;
    const updatedWords = [...words];
    const currentWord = updatedWords[currentWordIndex];
    if (!currentWord) return;

    // Prevent Tab focusing out; support Tab+Enter later
    if (e.key === 'Tab') {
      e.preventDefault();
    }

    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      // Mark completion; correctness based on equality
      currentWord.isCompleted = true;
      currentWord.isCorrect = currentWord.userInput === currentWord.text;
      currentWord.isCurrent = false;

      // Ensure there is always a next word available (infinite stream)
      if (currentWordIndex >= updatedWords.length - 2) {
        const pool = getWordPool({ punctuation: toggles.punctuation, numbers: toggles.numbers });
        const extra = generateWordsFromPool(10, pool).map((w) => ({
          text: w,
          isCurrent: false,
          isCompleted: false,
          isCorrect: false,
          userInput: '',
        }));
        updatedWords.push(...extra);
      }

      updatedWords[currentWordIndex + 1].isCurrent = true;
      setCurrentWordIndex(currentWordIndex + 1);
      // Shift the visible window when a row completes
      const nextIndex = currentWordIndex + 1;
      const startOfNextRow = wordsVisibleStart + wordsPerLine;
      if (nextIndex >= startOfNextRow) {
        setWordsVisibleStart(startOfNextRow);
      }
      setWords(updatedWords);
    }
  };

  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDurationSelect = (duration: number) => {
    setActiveDuration(duration);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-8">
      <div className="w-full">
        {/* Timer display */}
        <div className="flex justify-between items-center mb-8 text-lg text-muted-foreground">
          {/* Left timer - only visible when typing */}
          {sessionState === 'typing' && (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Time Left:</span>
              <span className="font-mono font-bold text-foreground">
                {formatTimeRemaining(timeRemaining)}
              </span>
            </div>
          )}
          
          {/* Right duration - always visible */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors ml-auto"
            onClick={onTimerClick}
          >
            <span className="text-muted-foreground">Duration:</span>
            <span className="font-mono font-bold text-foreground">
              {Math.floor(activeDuration / 60)}:{(activeDuration % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Utility Bar */}
        <UtilityBar
          toggles={toggles}
          onToggle={handleToggle}
          durations={durations}
          activeDuration={activeDuration}
          onSelectDuration={handleDurationSelect}
        />

        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="focus:outline-none"
          aria-label="Typing area"
        >
          <WordDisplay
            words={words}
            currentWordIndex={currentWordIndex}
            visibleStart={wordsVisibleStart}
            visibleCount={wordsPerLine * visibleLines}
          />
        </div>

        {/* Removed bottom input; typing happens directly in the text */}

        <div className="flex justify-center">
          <button
            onClick={restartPractice}
            className="inline-flex items-center justify-center h-10 w-10 rounded-2xl shadow hover:opacity-90 active:scale-95 transition bg-secondary hover:bg-secondary/80"
            aria-label="Restart test"
            title="Restart"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
} 