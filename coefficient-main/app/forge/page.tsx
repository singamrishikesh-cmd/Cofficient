'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { getDailyVariables } from '../../lib/dailyWords';
import { WORD_BANK } from '../../lib/wordBank';
import { scoreSentence } from '../../lib/forge';
import type { CoefficientWord } from '../../types';

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z]/g, '');

const PROMPTS = [
  'Write a sentence that sounds natural in a conversation.',
  'Write a sentence that could appear in an email to a professor.',
  'Write a sentence that explains an idea clearly to a friend.',
  'Write a sentence that shows a cause and effect.',
  'Write a sentence that contrasts two choices.',
];

export default function ForgePage() {
  const daily = useMemo(() => getDailyVariables(), []);
  const [mode, setMode] = useState<'daily' | 'library'>('daily');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(daily[0]?.id ?? WORD_BANK[0]?.id ?? '');
  const [sentence, setSentence] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);

  const list = useMemo(() => {
    if (mode === 'daily') return daily;
    const q = normalize(query);
    if (!q) return WORD_BANK.slice(0, 60);
    return WORD_BANK.filter((w) => normalize(w.word).includes(q)).slice(0, 60);
  }, [daily, mode, query]);

  const selected = useMemo(() => {
    const byId = (w: CoefficientWord) => w.id === selectedId;
    return daily.find(byId) ?? WORD_BANK.find(byId) ?? daily[0] ?? WORD_BANK[0];
  }, [daily, selectedId]);

  const prompt = PROMPTS[promptIndex % PROMPTS.length];
  const result = selected ? scoreSentence(sentence, selected) : { ok: false, message: 'Pick a word to begin.' };

  return (
    <main className="min-h-screen bg-transparent px-4 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Sentence Forge</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">Turn vocabulary into real usage</h1>
              <p className="mt-2 text-sm text-gray-600">Write one good sentence. Get immediate feedback. Repeat.</p>
            </div>
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Activities
            </Link>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Word source</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setMode('daily')}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  mode === 'daily' ? 'bg-blue-600 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Daily deck
              </button>
              <button
                type="button"
                onClick={() => setMode('library')}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  mode === 'library' ? 'bg-indigo-600 text-white' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Library
              </button>
            </div>

            {mode === 'library' ? (
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search words"
                className="mt-4 h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none ring-indigo-500 transition focus:ring-2"
              />
            ) : null}

            <div className="mt-4 max-h-[420px] space-y-2 overflow-auto pr-1">
              {list.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedId(w.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    w.id === selectedId
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold uppercase tracking-wide text-gray-900">{w.word}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">{w.partOfSpeech}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 line-clamp-2">{w.definition}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Prompt</p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{prompt}</p>
              </div>
              <button
                type="button"
                onClick={() => setPromptIndex((v) => v + 1)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <Sparkles className="h-4 w-4 text-blue-700" />
                New prompt
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-gray-900">
                  Use: <span className="uppercase text-blue-700">{selected?.word}</span>
                </p>
                <Wand2 className="h-4 w-4 text-rose-600" />
              </div>
              <p className="mt-2 text-sm text-gray-600">{selected?.definition}</p>
              <textarea
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                placeholder={`Write a sentence using "${selected?.word}"...`}
                className="mt-4 h-32 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none ring-blue-500 transition focus:ring-2"
              />

              <div className={`mt-4 rounded-xl border px-4 py-3 ${result.ok ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                <p className={`text-sm font-semibold ${result.ok ? 'text-emerald-800' : 'text-rose-800'}`}>{result.message}</p>
                {!result.ok ? (
                  <p className="mt-1 text-xs text-rose-700">
                    Tip: include the exact word and end with punctuation.
                  </p>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSentence('')}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPromptIndex((v) => v + 1);
                    setSentence('');
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Next rep
                </button>
                <Link
                  href="/library"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Browse words
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
