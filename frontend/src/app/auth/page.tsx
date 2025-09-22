"use client";

import AuthButtons from "@/components/AuthButtons";
import { useSession } from "next-auth/react";

export default function AuthPage() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="rounded-xl border border-border bg-card p-8 w-full max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-bold">Authentication</h1>
        {session ? (
          <div className="space-y-2">
            <div>Signed in as {session.user?.email}</div>
            <div className="flex items-center justify-center">
              <img
                src={session.user?.image || ""}
                alt="avatar"
                className="w-10 h-10 rounded-full border border-border"
              />
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Sign in to save progress and join races.</p>
        )}
        <div className="pt-2">
          <AuthButtons />
        </div>
      </div>
    </div>
  );
}

// Legacy login page removed in favor of NextAuth
