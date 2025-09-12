"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Entry = {
  username: string;
  countryCode: string; // ISO-2 for potential future use
  wpm: number;
  accuracy: number; // percentage
};

const FLAG_US = "🇺🇸";

const SAMPLE_ENTRIES: Entry[] = [
  { username: "JamesJohnson", countryCode: "US", wpm: 168, accuracy: 99 },
  { username: "MaryWilliams", countryCode: "US", wpm: 162, accuracy: 98 },
  { username: "RobertBrown", countryCode: "US", wpm: 158, accuracy: 97 },
  { username: "PatriciaJones", countryCode: "US", wpm: 152, accuracy: 99 },
  { username: "JohnMiller", countryCode: "US", wpm: 149, accuracy: 96 },
  { username: "JenniferDavis", countryCode: "US", wpm: 146, accuracy: 99 },
  { username: "MichaelGarcia", countryCode: "US", wpm: 144, accuracy: 95 },
  { username: "ElizabethRodriguez", countryCode: "US", wpm: 142, accuracy: 97 },
  { username: "WilliamMartinez", countryCode: "US", wpm: 140, accuracy: 96 },
  { username: "BarbaraHernandez", countryCode: "US", wpm: 139, accuracy: 95 },
];

export default function Page() {
  const [tab, setTab] = useState<"speed" | "accuracy">("speed");

  const rows = useMemo(() => {
    const sorted = [...SAMPLE_ENTRIES].sort((a, b) =>
      tab === "speed" ? b.wpm - a.wpm : b.accuracy - a.accuracy
    );
    return sorted.map((e, idx) => ({ ...e, rank: idx + 1 }));
  }, [tab]);

  const rankClass = (rank: number) =>
    rank === 1
      ? "bg-yellow-400/15 text-yellow-300 border-yellow-500"
      : rank === 2
      ? "bg-slate-400/15 text-slate-200 border-slate-500"
      : rank === 3
      ? "bg-orange-500/15 text-orange-300 border-orange-600" // bronze
      : "bg-card text-foreground border-border";

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Leaderboards</h1>
          <div className="inline-flex rounded-lg overflow-hidden border border-border">
            <button
              className={`px-4 py-2 text-sm ${
                tab === "speed" ? "bg-primary text-primary-foreground" : "bg-transparent"
              }`}
              onClick={() => setTab("speed")}
            >
              Top Speed
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                tab === "accuracy" ? "bg-primary text-primary-foreground" : "bg-transparent"
              }`}
              onClick={() => setTab("accuracy")}
            >
              Top Accuracy
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid grid-cols-12 px-4 py-3 text-sm text-muted-foreground border-b border-border">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">User</div>
            <div className="col-span-2 text-right">WPM</div>
            <div className="col-span-2 text-right">Accuracy</div>
          </div>
          <ul>
            {rows.map((row) => (
              <li
                key={row.username}
                className={`grid grid-cols-12 items-center px-4 py-3 border-b border-border ${rankClass(
                  row.rank
                )}`}
              >
                <div className="col-span-2 font-semibold">#{row.rank}</div>
                <div className="col-span-6 flex items-center gap-3">
                  <span className="text-xl" aria-label="United States flag">
                    {FLAG_US}
                  </span>
                  <Link
                    className="hover:underline"
                    href={`/user/${encodeURIComponent(row.username)}`}
                  >
                    {row.username}
                  </Link>
                </div>
                <div className="col-span-2 text-right font-mono">{row.wpm}</div>
                <div className="col-span-2 text-right font-mono">{row.accuracy}%</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}