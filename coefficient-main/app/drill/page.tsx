'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, Zap } from 'lucide-react';
import { WORD_BANK } from '../../lib/wordBank';
import type { CoefficientWord } from '../../types';

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const buildQuestion = (bank: CoefficientWord[]) => {
  const answer = pick(bank);
  const distractors = new Set<string>();
  while (distractors.size < 3) {
    const d = pick(bank);
    if (d.id !== answer.id) distractors.add(d.id);
  }
  const options = [answer, ...Array.from(distractors).map((id) => bank.find((w) => w.id === id)!).filter(Boolean)];
  const shuffled = options.sort(() => Math.random() - 0.5);
  return { answer, options: shuffled };
};

export default function DrillPage() {
  const bank = useMemo(() => WORD_BANK.filter((w) => w.definition && w.definition !== 'Definition coming soon.'), []);
  const [{ answer, options }, setQuestion] = useState(() => buildQuestion(bank));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const reveal = selectedId !== null;
  const correct = selectedId === answer.id;

  const next = () => {
    setSelectedId(null);
    setQuestion(buildQuestion(bank));
  };

  return (
    <main className="min-h-screen bg-transparent px-4 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Speed Drill</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">Pick the correct definition</h1>
              <p className="mt-2 text-sm text-gray-600">Fast reps. No fluff.</p>
            </div>
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white active:scale-[0.99]"
            >
              <ArrowLeft className="h-4 w-4" />
              Activities
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Word</p>
                <p className="mt-2 text-4xl font-semibold uppercase tracking-wide text-gray-900">{answer.word}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-blue-700">{answer.partOfSpeech}</p>
              </div>
              <Zap className="h-5 w-5 text-amber-500" />
            </div>

            <div className="mt-6 grid gap-3">
              {options.map((opt) => {
                const isSelected = selectedId === opt.id;
                const isAnswer = opt.id === answer.id;
                const tone = !reveal
                  ? 'border-gray-200 bg-white hover:bg-gray-50'
                  : isAnswer
                    ? 'border-emerald-200 bg-emerald-50'
                    : isSelected
                      ? 'border-rose-200 bg-rose-50'
                      : 'border-gray-200 bg-white';

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={reveal}
                    onClick={() => {
                      setSelectedId(opt.id);
                      setTotalCount((v) => v + 1);
                      if (opt.id === answer.id) setCorrectCount((v) => v + 1);
                    }}
                    className={`rounded-2xl border px-4 py-4 text-left text-sm text-gray-800 shadow-sm transition ${tone} disabled:cursor-not-allowed`}
                  >
                    {opt.definition}
                  </button>
                );
              })}
            </div>

            {reveal ? (
              <div className={`mt-5 rounded-2xl border p-4 ${correct ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                <p className={`flex items-center gap-2 text-sm font-semibold ${correct ? 'text-emerald-800' : 'text-rose-800'}`}>
                  <CheckCircle2 className="h-4 w-4" />
                  {correct ? 'Correct.' : 'Not quite.'}
                </p>
                {!correct ? <p className="mt-1 text-sm text-rose-700">Answer: {answer.definition}</p> : null}
                <button
                  type="button"
                  onClick={next}
                  className="mt-3 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99]"
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-md backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Score</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{correctCount}</p>
              <p className="mt-1 text-sm text-gray-600">Correct out of {totalCount} attempts</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-md backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Reset</p>
              <button
                type="button"
                onClick={() => {
                  setCorrectCount(0);
                  setTotalCount(0);
                  setSelectedId(null);
                  setQuestion(buildQuestion(bank));
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Drill
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

