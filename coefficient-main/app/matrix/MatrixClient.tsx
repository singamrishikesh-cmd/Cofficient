'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, CircleCheckBig, Home, RotateCcw } from 'lucide-react';
import type { LetterState } from '../../types';

const MAX_GUESSES = 6;

const normalizeWord = (value: string): string => value.toLowerCase().replace(/[^a-z]/g, '');

const evaluateGuess = (guess: string, answer: string): LetterState[] => {
  const result: LetterState[] = Array.from({ length: answer.length }, () => 'absent');
  const answerPool = answer.split('');
  const guessChars = guess.split('');

  for (let i = 0; i < guessChars.length; i += 1) {
    if (guessChars[i] === answerPool[i]) {
      result[i] = 'correct';
      answerPool[i] = '*';
      guessChars[i] = '_';
    }
  }

  for (let i = 0; i < guessChars.length; i += 1) {
    const foundIndex = answerPool.indexOf(guessChars[i]);
    if (guessChars[i] !== '_' && foundIndex >= 0) {
      result[i] = 'present';
      answerPool[foundIndex] = '*';
    }
  }

  return result;
};

const tileStyle: Record<LetterState, string> = {
  empty: 'border-gray-200 bg-white text-gray-900',
  absent: 'border-gray-200 bg-gray-200 text-gray-600',
  present: 'border-yellow-200 bg-yellow-100 text-yellow-800',
  correct: 'border-green-200 bg-green-100 text-green-800',
};

export default function MatrixClient({
  secretWord,
  validGuesses,
}: {
  secretWord: string;
  validGuesses: string[];
}) {
  const normalizedSecret = useMemo(() => normalizeWord(secretWord), [secretWord]);
  const normalizedValid = useMemo(() => validGuesses.map(normalizeWord), [validGuesses]);

  const [input, setInput] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<LetterState[][]>([]);
  const [error, setError] = useState('');

  const solved = guesses.some((guess) => guess === normalizedSecret);
  const exhausted = guesses.length >= MAX_GUESSES;
  const complete = solved || exhausted;

  const submitGuess = () => {
    setError('');
    if (complete) return;

    const normalizedInput = normalizeWord(input);
    if (normalizedInput.length !== normalizedSecret.length) {
      setError(`Guess must be ${normalizedSecret.length} letters.`);
      return;
    }

    if (!normalizedValid.includes(normalizedInput)) {
      setError('Use one of today’s swipe-deck words.');
      return;
    }

    setGuesses((prev) => [...prev, normalizedInput]);
    setStatuses((prev) => [...prev, evaluateGuess(normalizedInput, normalizedSecret)]);
    setInput('');
  };

  const rows = useMemo(() => {
    return Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
      const guess = guesses[rowIndex] ?? '';
      const rowStates = statuses[rowIndex] ?? Array.from({ length: normalizedSecret.length }, () => 'empty' as const);
      return { guess, rowStates };
    });
  }, [guesses, normalizedSecret.length, statuses]);

  return (
    <main className="min-h-screen bg-transparent px-4 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Coefficient</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">Lekto Matrix</h1>
              <p className="mt-2 text-sm text-gray-600">Crack the hidden word from your daily swipe deck.</p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/home"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white active:scale-[0.99]"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white active:scale-[0.99]"
              >
                <ArrowLeft className="h-4 w-4" />
                Deck
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="space-y-3">
              {rows.map((row, rowIndex) => (
                <div
                  key={`row-${rowIndex}`}
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${normalizedSecret.length}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: normalizedSecret.length }, (_, colIndex) => {
                    const letter = row.guess[colIndex]?.toUpperCase() ?? '';
                    return (
                      <div
                        key={`cell-${rowIndex}-${colIndex}`}
                        className={`flex h-12 items-center justify-center rounded-xl border text-lg font-semibold uppercase ${tileStyle[row.rowStates[colIndex]]}`}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') submitGuess();
                }}
                maxLength={normalizedSecret.length}
                disabled={complete}
                className="h-11 flex-1 rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none ring-blue-500 transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100"
                placeholder={`Enter ${normalizedSecret.length}-letter guess`}
              />
              <button
                type="button"
                onClick={submitGuess}
                disabled={complete}
                className="h-11 rounded-xl bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 active:scale-[0.99]"
              >
                Submit
              </button>
            </div>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-md backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Today’s Valid Guesses</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {normalizedValid.map((word) => (
                  <span
                    key={word}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-md backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Result</h3>
              {!complete ? (
                <p className="mt-3 text-sm text-gray-600">
                  Attempts used: <span className="font-semibold text-gray-900">{guesses.length}</span> / {MAX_GUESSES}
                </p>
              ) : solved ? (
                <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-green-700">
                    <CircleCheckBig className="h-4 w-4" />
                    You solved it.
                  </p>
                </div>
              ) : (
                <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3">
                  <p className="text-sm font-medium text-red-700">Out of guesses.</p>
                  <p className="mt-1 text-sm text-red-700">Answer: {normalizedSecret.toUpperCase()}</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setGuesses([]);
                  setStatuses([]);
                  setInput('');
                  setError('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Matrix
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

