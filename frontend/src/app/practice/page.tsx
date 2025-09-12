"use client";

import { useState } from 'react';
import TypingInterface from './components/TypingInterface';
import ResultsScreen from './components/ResultsScreen';
import { TypingStats } from './utils/typingUtils';

export default function PracticePage() {
  const [finalStats, setFinalStats] = useState<TypingStats | null>(null);

  const handlePracticeFinish = (stats: TypingStats) => {
    setFinalStats(stats);
  };

  const handleRestart = () => {
    setFinalStats(null);
  };

  const handleTimerClick = () => {
    // This is now handled by the utility bar duration pills
    // Keeping for backward compatibility but it's not used
  };

  // Show results screen if practice is completed
  if (finalStats) {
    return <ResultsScreen stats={finalStats} onRestart={handleRestart} />;
  }

  // Show main typing interface
  return (
    <TypingInterface
      timeSeconds={30}
      onFinish={handlePracticeFinish}
      onRestart={handleRestart}
      onTimerClick={handleTimerClick}
    />
  );
}