'use client';

import Link from 'next/link';
import { BookOpenCheck, ChevronRight, Crosshair, House, LibraryBig, Sparkles, Wand2, Zap } from 'lucide-react';
import type { CoefficientWord } from '../../types';

export default function HomeClient({
  dailyWords,
  deckLength,
  librarySizeLabel,
  spotlight,
}: {
  dailyWords: CoefficientWord[];
  deckLength: number;
  librarySizeLabel: string;
  spotlight: CoefficientWord[];
}) {
  return (
    <main className="min-h-screen bg-transparent px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Home</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">Your Daily Lexicon Loop</h1>
              <p className="mt-2 text-sm text-gray-600">
                Complete the learning deck first, then test your memory in the matrix.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white active:scale-[0.99]"
            >
              <House className="h-4 w-4" />
              Landing
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-200 bg-white/80 p-6 shadow-md backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Today&apos;s Word Length</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{deckLength || '—'}</p>
            <p className="mt-1 text-sm text-gray-600">Matrix guesses match this length.</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white/80 p-6 shadow-md backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Library Size</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{librarySizeLabel}</p>
            <p className="mt-1 text-sm text-gray-600">Seed words for daily decks.</p>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-white/80 p-6 shadow-md backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Today&apos;s Deck</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {dailyWords.map((entry) => (
                <span
                  key={entry.id}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700"
                >
                  {entry.word}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-xl">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Quick Actions</p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900">Pick a mode</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Recognition → recall → usage. Keep sessions short and consistent.
                </p>
              </div>
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/learn"
                className="inline-flex items-center justify-between gap-3 rounded-2xl border border-blue-200 bg-gradient-to-br from-white to-blue-50 px-4 py-4 text-sm font-semibold text-gray-900 shadow-md transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  <BookOpenCheck className="h-4 w-4 text-blue-700" />
                  Swipe Deck
                </span>
                <ChevronRight className="h-4 w-4 text-blue-700" />
              </Link>
              <Link
                href="/matrix"
                className="inline-flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-br from-white to-emerald-50 px-4 py-4 text-sm font-semibold text-gray-900 shadow-md transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  <Crosshair className="h-4 w-4 text-emerald-700" />
                  Lekto Matrix
                </span>
                <ChevronRight className="h-4 w-4 text-emerald-700" />
              </Link>
              <Link
                href="/library"
                className="inline-flex items-center justify-between gap-3 rounded-2xl border border-indigo-200 bg-gradient-to-br from-white to-indigo-50 px-4 py-4 text-sm font-semibold text-gray-900 shadow-md transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  <LibraryBig className="h-4 w-4 text-indigo-700" />
                  Library
                </span>
                <ChevronRight className="h-4 w-4 text-indigo-700" />
              </Link>
              <Link
                href="/forge"
                className="inline-flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-gradient-to-br from-white to-rose-50 px-4 py-4 text-sm font-semibold text-gray-900 shadow-md transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  <Wand2 className="h-4 w-4 text-rose-700" />
                  Sentence Forge
                </span>
                <ChevronRight className="h-4 w-4 text-rose-700" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Spotlight</p>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">Three words to remember</h2>
            <div className="mt-4 space-y-3">
              {spotlight.map((entry) => (
                <div key={entry.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-900">{entry.word}</p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">{entry.partOfSpeech}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{entry.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-blue-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <BookOpenCheck className="h-5 w-5 text-blue-600" />
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Swipe Deck</h2>
            <p className="mt-2 text-sm text-gray-600">Build recognition fast. Swipe right for Got it, left for Review.</p>
            <Link
              href="/learn"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Start Deck
              <ChevronRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="rounded-2xl border border-emerald-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <Crosshair className="h-5 w-5 text-emerald-700" />
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Lekto Matrix</h2>
            <p className="mt-2 text-sm text-gray-600">Test recall. Guess the hidden word chosen from today&apos;s deck.</p>
            <Link
              href="/matrix"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 active:scale-[0.99]"
            >
              Open Matrix
              <ChevronRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="rounded-2xl border border-indigo-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <LibraryBig className="h-5 w-5 text-indigo-700" />
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Library</h2>
            <p className="mt-2 text-sm text-gray-600">Search words by length, read meanings, and skim synonyms.</p>
            <Link
              href="/library"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-medium text-indigo-800 transition hover:bg-indigo-100 active:scale-[0.99]"
            >
              Browse Library
              <ChevronRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="rounded-2xl border border-rose-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <Wand2 className="h-5 w-5 text-rose-700" />
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Sentence Forge</h2>
            <p className="mt-2 text-sm text-gray-600">Turn a word into a sentence that sounds natural.</p>
            <Link
              href="/forge"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-medium text-rose-800 transition hover:bg-rose-100 active:scale-[0.99]"
            >
              Open Forge
              <ChevronRight className="h-4 w-4" />
            </Link>
          </article>

          <article className="rounded-2xl border border-amber-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <Zap className="h-5 w-5 text-amber-600" />
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Speed Drill</h2>
            <p className="mt-2 text-sm text-gray-600">Pick the correct definition. Fast reps. Quick score.</p>
            <Link
              href="/drill"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800 transition hover:bg-amber-100 active:scale-[0.99]"
            >
              Start Drill
              <ChevronRight className="h-4 w-4" />
            </Link>
          </article>
        </section>
      </div>
    </main>
  );
}
