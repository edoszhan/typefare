"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function UserProfilePage() {
  const params = useParams();
  const username = Array.isArray(params?.username)
    ? params?.username[0]
    : (params?.username as string);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
            <span className="text-2xl" aria-label="United States flag">🇺🇸</span>
            {username}
          </h1>
          <Link href="/leaderboards" className="text-sm text-muted-foreground hover:underline">
            Back to Leaderboards
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Overview</h2>
            <div className="text-sm text-muted-foreground">Sample user profile</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Best WPM</div>
                <div className="font-mono text-lg">168</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Best Accuracy</div>
                <div className="font-mono text-lg">99%</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Tests</div>
                <div className="font-mono text-lg">124</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Member Since</div>
                <div className="font-mono text-lg">2024</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-semibold">Recent Sessions</h2>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between"><span>60s practice</span><span className="font-mono">162 WPM, 98%</span></li>
              <li className="flex justify-between"><span>30s practice</span><span className="font-mono">149 WPM, 96%</span></li>
              <li className="flex justify-between"><span>15s practice</span><span className="font-mono">140 WPM, 95%</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

