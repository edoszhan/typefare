import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Master typing with precision and speed
              </h1>
              <p className="text-lg text-muted-foreground">
                Train smarter with real-time accuracy, letter-by-letter feedback, and infinitely
                generated word sets. Built for focus and performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/practice"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                >
                  Start practicing
                </Link>
                <Link
                  href="/leaderboards"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:border-foreground/40 text-foreground"
                >
                  View leaderboards
                </Link>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/typefare-logo.jpg"
                alt="Typefare preview"
                width={420}
                height={260}
                className="rounded-xl border border-border"
              />
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-2">
            <h3 className="font-semibold">Letter-by-letter feedback</h3>
            <p className="text-sm text-muted-foreground">See correctness instantly and fix mistakes without losing flow.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 space-y-2">
            <h3 className="font-semibold">Modes you control</h3>
            <p className="text-sm text-muted-foreground">Toggle words, numbers, and punctuation. Choose your duration.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 space-y-2">
            <h3 className="font-semibold">Competitive leaderboards</h3>
            <p className="text-sm text-muted-foreground">Track top speed and accuracy. Compare and improve.</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="rounded-2xl border border-border bg-card p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold">Built for focus</h2>
              <p className="text-muted-foreground">
                Minimal UI, three-line viewport, and infinite word generation keep you in the zone
                until the timer ends.
              </p>
            </div>
            <Link
              href="/practice"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Try a 30s test
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-muted-foreground flex items-center justify-between">
          <span>© Copyright {new Date().getFullYear()} Typefare</span>
          <div className="flex gap-4">
            <Link href="/discussion" className="hover:text-foreground">Help & Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
