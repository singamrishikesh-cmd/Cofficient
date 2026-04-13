import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpenCheck, LibraryBig, Sparkles, Target } from 'lucide-react';
import FloatingWords from '../components/landing/FloatingWords';
import LiveStats from '../components/landing/LiveStats';
import { getDailyVariables } from '../lib/dailyWords';
import { WORD_BANK } from '../lib/wordBank';
import { formatCountPlus } from '../lib/format';

export default function LandingPage() {
  const daily = getDailyVariables();
  const wordLength = daily.length ? daily[0].word.replace(/[^a-z]/gi, '').length : 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.14),transparent_52%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,0.12),transparent_48%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.10),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      <FloatingWords />

      <div className="relative px-4 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/coefficient-mark.svg" alt="Coefficient logo" width={36} height={36} priority />
              <div>
                <p className="text-sm font-semibold tracking-tight text-gray-900">Coefficient</p>
                <p className="text-xs text-gray-600">Build vocabulary that shows up in real conversations</p>
              </div>
            </div>
            <nav className="hidden items-center gap-2 sm:flex">
              <Link
                href="/library"
                className="rounded-xl border border-gray-200 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur transition hover:bg-white"
              >
                Library
              </Link>
              <Link
                href="/activities"
                className="rounded-xl border border-gray-200 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur transition hover:bg-white"
              >
                Activities
              </Link>
              <Link
                href="/home"
                className="rounded-xl border border-gray-200 bg-white/70 px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur transition hover:bg-white"
              >
                Open App
              </Link>
            </nav>
          </header>

          <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur">
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">For writing and communication</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                Learn better words.
                <span className="text-blue-700"> Use them naturally.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
                Short daily sessions that upgrade clarity, precision, and confidence in how you speak and write.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/home"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-blue-700"
                >
                  Start Today&apos;s Session
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600">
                  No signup required
                </span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 px-4 py-3 shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Daily deck</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">5</p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 px-4 py-3 shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Recall tries</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">6</p>
                </div>
                <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-white to-indigo-50 px-4 py-3 shadow-md">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Session time</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">10m</p>
                </div>
              </div>

              <LiveStats
                deckSize={daily.length || 5}
                wordLength={wordLength}
                libraryLabel={formatCountPlus(WORD_BANK.length, 250)}
              />

              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Library Preview</p>
                <p className="mt-2 text-sm text-gray-700">
                  Browse <span className="font-semibold text-gray-900">{formatCountPlus(WORD_BANK.length, 250)}</span> words with meanings and synonyms.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {WORD_BANK.slice(0, 10).map((entry) => (
                    <span
                      key={entry.id}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700"
                    >
                      {entry.word}
                    </span>
                  ))}
                </div>
                <Link className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800" href="/library">
                  Explore the Library →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-semibold text-gray-900">Activities</p>
              <div className="mt-4 grid gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <BookOpenCheck className="h-5 w-5 text-blue-600" />
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                      Daily
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-gray-900">Swipe Deck</h2>
                  <p className="mt-1 text-sm text-gray-600">Fast recognition. Tag each word as Got it or Review.</p>
                  <Link className="mt-3 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800" href="/learn">
                    Open Deck →
                  </Link>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <Target className="h-5 w-5 text-emerald-600" />
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      Recall
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-gray-900">Lekto Matrix</h2>
                  <p className="mt-1 text-sm text-gray-600">Wordle-style recall. Guess the hidden word from your deck.</p>
                  <Link className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800" href="/matrix">
                    Open Matrix →
                  </Link>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <LibraryBig className="h-5 w-5 text-indigo-600" />
                    <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                      Explore
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-gray-900">Word Library</h2>
                  <p className="mt-1 text-sm text-gray-600">Search 200+ words with meanings, synonyms, and examples.</p>
                  <Link className="mt-3 inline-flex text-sm font-semibold text-indigo-700 hover:text-indigo-800" href="/library">
                    Browse Library →
                  </Link>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <Sparkles className="h-5 w-5 text-rose-600" />
                    <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
                      Practice
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-gray-900">Sentence Forge</h2>
                  <p className="mt-1 text-sm text-gray-600">Write one good sentence. Get feedback. Repeat.</p>
                  <Link className="mt-3 inline-flex text-sm font-semibold text-rose-700 hover:text-rose-800" href="/forge">
                    Open Forge →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/70 p-4 text-sm text-gray-600 shadow-md backdrop-blur">
            <p>Built for focused study.</p>
            <Link className="font-medium text-blue-700 hover:text-blue-800" href="/home">
              Enter App
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
