"use client";

interface UtilityBarProps {
  toggles: { 
    punctuation: boolean; 
    numbers: boolean; 
    time: boolean; 
    words: boolean 
  };
  onToggle: (key: keyof UtilityBarProps["toggles"]) => void;
  durations: number[];
  activeDuration: number;
  onSelectDuration: (duration: number) => void;
}

export default function UtilityBar({ 
  toggles, 
  onToggle, 
  durations, 
  activeDuration, 
  onSelectDuration 
}: UtilityBarProps) {
  return (
    <div className="flex items-center justify-between text-sm opacity-80 hover:opacity-100 transition mb-6 text-foreground">
      {/* Left cluster - feature toggles */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => onToggle('punctuation')}
          className={`flex items-center gap-1 transition ${
            toggles.punctuation 
              ? 'text-foreground underline' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={toggles.punctuation}
        >
          <span>@</span>
          <span>punctuation</span>
        </button>
        
        <button
          onClick={() => onToggle('numbers')}
          className={`flex items-center gap-1 transition ${
            toggles.numbers 
              ? 'text-foreground underline' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={toggles.numbers}
        >
          <span>#</span>
          <span>numbers</span>
        </button>
        
        <span className="text-muted-foreground">|</span>
        
        <button
          onClick={() => onToggle('time')}
          className={`transition ${
            toggles.time 
              ? 'text-foreground underline' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={toggles.time}
        >
          time
        </button>
        
        <button
          onClick={() => onToggle('words')}
          className={`transition ${
            toggles.words 
              ? 'text-foreground underline' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-pressed={toggles.words}
        >
          words
        </button>
      </div>
      
      {/* Right cluster - duration pills */}
      <div className="flex items-center gap-3">
        {durations.map((duration) => (
          <button
            key={duration}
            onClick={() => onSelectDuration(duration)}
            className={`px-3 py-1 rounded-full text-xs transition ${
              activeDuration === duration
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
            }`}
            aria-current={activeDuration === duration ? "true" : "false"}
          >
            {duration}
          </button>
        ))}
      </div>
    </div>
  );
} 