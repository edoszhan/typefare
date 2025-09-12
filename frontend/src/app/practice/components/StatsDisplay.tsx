"use client";

import { TypingStats } from '../utils/typingUtils';

interface StatsDisplayProps {
  stats: TypingStats;
  timeRemaining: number;
}

export default function StatsDisplay({ stats, timeRemaining }: StatsDisplayProps) {
  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-center items-center gap-8 text-lg text-gray-300 mb-8">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Time Left:</span>
        <span className="font-mono font-bold text-white">
          {formatTimeRemaining(timeRemaining)}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-500">WPM:</span>
        <span className="font-mono font-bold text-white">{stats.wpm}</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Accuracy:</span>
        <span className="font-mono font-bold text-white">{stats.accuracy}%</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-500">Words:</span>
        <span className="font-mono font-bold text-white">
          {stats.wordsCompleted}/{stats.totalWords}
        </span>
      </div>
    </div>
  );
} 