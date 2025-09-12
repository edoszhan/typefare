import commonWords from '../common.json';
import numbersData from '../numbers.json';
import punctuationData from '../punctuation.json';

export interface WordState {
  text: string;
  isCurrent: boolean;
  isCompleted: boolean;
  isCorrect: boolean;
  userInput: string;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  timeElapsed: number;
  wordsCompleted: number;
  totalWords: number;
}

// Generate random words from common.json
export const generateWords = (count: number): string[] => {
  return generateWordsFromPool(count, commonWords.common_words);
};

export const generateWordsFromPool = (count: number, pool: string[]): string[] => {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    words.push(pool[randomIndex]);
  }
  return words;
};

export const getWordPool = (options: { punctuation: boolean; numbers: boolean }): string[] => {
  // Combine or select pools based on toggles. Default to common words only.
  let pool: string[] = [...commonWords.common_words];
  if (options.numbers) {
    pool = pool.concat(numbersData.common_words);
  }
  if (options.punctuation) {
    pool = pool.concat(punctuationData.common_words);
  }
  return pool;
};

// Initialize word states
export const initializeWordStates = (words: string[]): WordState[] => {
  return words.map((word, index) => ({
    text: word,
    isCurrent: index === 0,
    isCompleted: false,
    isCorrect: false,
    userInput: '',
  }));
};

// Calculate WPM (Words Per Minute)
export const calculateWPM = (wordsCompleted: number, timeSeconds: number): number => {
  if (timeSeconds === 0) return 0;
  return Math.round((wordsCompleted / timeSeconds) * 60);
};

// Calculate accuracy percentage
export const calculateAccuracy = (correctWords: number, totalWords: number): number => {
  if (totalWords === 0) return 100;
  return Math.round((correctWords / totalWords) * 100);
};

// Check if a word is correctly typed
export const isWordCorrect = (typed: string, target: string): boolean => {
  return typed.trim() === target.trim();
};

// Format time as MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Estimate how many words we need for a given time duration
export const estimateWordCount = (timeSeconds: number): number => {
  // Assume average typing speed of 40 WPM for estimation
  const estimatedWPM = 40;
  return Math.ceil((estimatedWPM * timeSeconds) / 60);
}; 