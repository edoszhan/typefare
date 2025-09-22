"use client";

import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-2 rounded bg-primary text-primary-foreground hover:opacity-90"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
      <button
        className="px-3 py-2 rounded border border-border hover:border-foreground/40"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
