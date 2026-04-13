'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Infinity, RotateCcw, Sparkles } from 'lucide-react';
import SwipeCard from '../../components/learn/SwipeCard';
import type { CoefficientWord } from '../../types';

type SwipeDecision = 'got-it' | 'review';

export default function LearnClient({
  dailyWords,
  stream,
}: {
  dailyWords: CoefficientWord[];
  stream: CoefficientWord[];
}) {
  const [infiniteMode, setInfiniteMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [decisions, setDecisions] = useState<Record<string, SwipeDecision>>({});

  const finiteDeck = dailyWords;
  const deck = infiniteMode ? stream : finiteDeck;

  const activeWord = useMemo(() => {
    if (deck.length === 0) return undefined;
    return deck[index % deck.length];
  }, [deck, index]);

  const complete = !infiniteMode && index >= finiteDeck.length;

  const handleDecision = (decision: SwipeDecision) => {
    if (!activeWord) return;
    setDecisions((prev) => ({ ...prev, [activeWord.id]: decision }));
    setIndex((prev) => prev + 1);
  };

  const gotItCount = Object.values(decisions).filter((value) => value === 'got-it').length;
  const reviewCount = Object.values(decisions).filter((value) => value === 'review').length;

  return (
    <main className="min-h-screen bg-transparent px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Coefficient</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">Swipe Deck</h1>
              <p className="mt-2 text-sm text-gray-600">Swipe right if you know it. Swipe left if you want to review it.</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/80 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Progress</p>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {infiniteMode ? index + 1 : Math.min(index + 1, finiteDeck.length)} / {infiniteMode ? '∞' : finiteDeck.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setInfiniteMode((v) => !v);
                setIndex(0);
                setDecisions({});
              }}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                infiniteMode ? 'border-blue-200 bg-blue-50 text-blue-800' : 'border-gray-200 bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <Infinity className="h-4 w-4" />
              Infinite
            </button>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white active:scale-[0.99]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex min-h-[480px] items-center justify-center rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            {!complete && activeWord ? (
              <SwipeCard
                key={`${activeWord.id}-${index}`}
                wordData={activeWord}
                onSwipeRight={() => handleDecision('got-it')}
                onSwipeLeft={() => handleDecision('review')}
              />
            ) : (
              <div className="w-full max-w-md rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                <CheckCircle2 className="mx-auto h-9 w-9 text-green-600" />
                <h2 className="mt-3 text-2xl font-semibold text-gray-900">Deck Complete</h2>
                <p className="mt-2 text-sm text-gray-600">Great run. Jump into the Lekto Matrix and test recall.</p>
                <Link
                  href="/matrix"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  <Sparkles className="h-4 w-4" />
                  Start Lekto Matrix
                </Link>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-md backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Session Stats</h3>
              <div className="mt-4 grid gap-3">
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-green-700">Got it</p>
                  <p className="text-2xl font-semibold text-green-700">{gotItCount}</p>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-xs uppercase tracking-wide text-red-700">Review</p>
                  <p className="text-2xl font-semibold text-red-700">{reviewCount}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-md backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Need a reset?</h3>
              <button
                type="button"
                onClick={() => {
                  setIndex(0);
                  setDecisions({});
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
              >
                <RotateCcw className="h-4 w-4" />
                Restart Deck
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

