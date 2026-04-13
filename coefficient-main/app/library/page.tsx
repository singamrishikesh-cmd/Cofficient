'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { WORD_BANK } from '../../lib/wordBank';

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z]/g, '');

export default function LibraryPage() {
  const [query, setQuery] = useState('');
  const [length, setLength] = useState<number | 'all'>('all');

  const normalizedQuery = normalize(query);
  const words = useMemo(() => {
    let list = WORD_BANK;
    if (length !== 'all') {
      list = list.filter((entry) => normalize(entry.word).length === length);
    }
    if (normalizedQuery) {
      list = list.filter((entry) => normalize(entry.word).includes(normalizedQuery));
    }
    return list;
  }, [length, normalizedQuery]);

  const availableLengths = useMemo(() => {
    const set = new Set<number>();
    for (const entry of WORD_BANK) {
      const len = normalize(entry.word).length;
      if (len >= 4 && len <= 12) set.add(len);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Library</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">200+ Vocabulary Words</h1>
              <p className="mt-2 text-sm text-gray-600">Search, filter by length, and explore meanings.</p>
            </div>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative">
              <span className="sr-only">Search</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none ring-blue-500 transition focus:ring-2"
                placeholder="Search words"
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">
              <span className="text-sm font-medium text-gray-700">Length</span>
              <select
                value={length}
                onChange={(event) => {
                  const value = event.target.value;
                  setLength(value === 'all' ? 'all' : Number(value));
                }}
                className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none"
              >
                <option value="all">All</option>
                {availableLengths.map((len) => (
                  <option key={len} value={len}>
                    {len}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{words.length}</span> / {WORD_BANK.length}
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="grid gap-0 divide-y divide-gray-200">
            {words.slice(0, 250).map((entry) => (
              <div key={entry.id} className="grid gap-2 px-6 py-5 md:grid-cols-[220px_1fr] md:items-start">
                <div>
                  <p className="text-lg font-semibold uppercase tracking-wide text-gray-900">{entry.word}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-blue-700">{entry.partOfSpeech}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">{entry.definition}</p>
                  {entry.synonyms.length ? (
                    <p className="mt-2 text-xs text-gray-500">
                      Synonyms: <span className="text-gray-700">{entry.synonyms.slice(0, 6).join(', ')}</span>
                    </p>
                  ) : null}
                  {entry.example ? <p className="mt-2 text-xs italic text-gray-500">&quot;{entry.example}&quot;</p> : null}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-sm text-gray-600">
            Showing up to 250 results on this page for performance.
          </div>
        </section>
      </div>
    </main>
  );
}

