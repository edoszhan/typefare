"use client";

import { TypingStats } from '../utils/typingUtils';

interface ResultsScreenProps {
  stats: TypingStats;
  onRestart: () => void;
}

export default function ResultsScreen({ stats, onRestart }: ResultsScreenProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0E13] text-white p-8">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-4xl font-bold">Practice Complete!</h1>
        
        <div className="grid grid-cols-2 gap-8 bg-[#1E293B] p-8 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{stats.wpm}</div>
            <div className="text-gray-400">WPM</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{stats.accuracy}%</div>
            <div className="text-gray-400">Accuracy</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{formatTime(stats.timeElapsed)}</div>
            <div className="text-gray-400">Time</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{stats.wordsCompleted}</div>
            <div className="text-gray-400">Words</div>
          </div>
        </div>
        
        <div className="text-gray-400">
          Completed {stats.wordsCompleted} out of {stats.totalWords} words
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            Practice Again
          </button>
        </div>
      </div>
    </div>
  );
} 