"use client";

import { WordState } from '../utils/typingUtils';

interface WordDisplayProps {
  words: WordState[];
  currentWordIndex: number;
  visibleStart?: number;
  visibleCount?: number;
}

export default function WordDisplay({ words, currentWordIndex, visibleStart = 0, visibleCount = words.length }: WordDisplayProps) {
  const visibleWords = words.slice(visibleStart, Math.min(visibleStart + visibleCount, words.length));
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 text-2xl leading-relaxed p-8 w-full">
      {visibleWords.map((word, i) => {
        const index = visibleStart + i;
        const isCurrent = index === currentWordIndex;
        if (!isCurrent) {
          // For completed incorrect words, render per-letter accuracy instead of full-word red
          if (word.isCompleted && !word.isCorrect) {
            const target = word.text;
            const typed = word.userInput || '';
            const renderLength = Math.max(target.length, typed.length);
            return (
              <span key={index} className="px-1 rounded">
                {Array.from({ length: renderLength }).map((_, i) => {
                  const targetCh = target[i];
                  const typedCh = typed[i];
                  const cls =
                    typeof targetCh !== 'undefined'
                      ? (typeof typedCh !== 'undefined'
                          ? (typedCh === targetCh ? 'text-foreground' : 'text-destructive')
                          : 'text-zinc-500')
                      : (typeof typedCh !== 'undefined' ? 'text-destructive' : 'text-zinc-500');
                  return (
                    <span key={i} className={cls}>
                      {typeof targetCh !== 'undefined' ? targetCh : typedCh || ''}
                    </span>
                  );
                })}
              </span>
            );
          }

          // Default non-current rendering
          return (
            <span
              key={index}
              className={`px-1 rounded ${
                word.isCompleted
                  ? word.isCorrect
                    ? 'text-foreground'
                    : 'text-destructive'
                  : 'text-zinc-500'
              }`}
            >
              {word.text}
            </span>
          );
        }

        // Per-letter rendering for current word, show overflow typed characters (no background highlight)
        const target = word.text;
        const typed = word.userInput || '';
        const caretIndex = typed.length;
        const renderLength = Math.max(target.length, typed.length);

        return (
          <span key={index} className="px-1 rounded text-foreground">
            {Array.from({ length: renderLength }).map((_, i) => {
              const targetCh = target[i];
              const typedCh = typed[i];
              const beforeCaret = i === caretIndex; // insert caret before this index

              const charEl = (
                <span
                  key={`ch-${i}`}
                  className={
                    typeof targetCh !== 'undefined'
                      ? // within target length: compare typed to target
                        (typeof typedCh !== 'undefined'
                          ? typedCh === targetCh
                            ? 'text-foreground' // swap: correct typed letters now white
                            : 'text-destructive' // wrong letter red
                          : 'text-zinc-500') // swap: not-yet-typed chars darker gray
                      : // overflow: show typed extra in red if exists
                        (typeof typedCh !== 'undefined' ? 'text-destructive' : 'text-muted-foreground')
                  }
                >
                  {typeof targetCh !== 'undefined' ? targetCh : typedCh || ''}
                </span>
              );

              return (
                <span key={i} className="inline-flex items-center">
                  {beforeCaret && (
                    <span className="inline-block w-0.5 h-6 align-middle bg-foreground mr-0.5 animate-pulse" />
                  )}
                  {charEl}
                </span>
              );
            })}
            {/* Caret at end when caretIndex === renderLength */}
            {caretIndex === renderLength && (
              <span className="inline-block w-0.5 h-6 align-middle bg-foreground ml-0.5 animate-pulse" />
            )}
          </span>
        );
      })}
    </div>
  );
} 