import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-md backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">About</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">Coefficient</h1>
              <p className="mt-2 text-sm text-gray-600">
                A modern vocabulary app with short, satisfying practice loops.
              </p>
            </div>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">What it is</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">A daily vocabulary loop</h2>
            <p className="mt-3 max-w-xl text-sm text-gray-600">
              Coefficient helps you learn words in a way that transfers to real writing and conversation.
              You move from recognition to recall to usage, one short session at a time.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">How to use</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-semibold text-blue-900">Swipe Deck</p>
                  <p className="mt-1 text-sm text-blue-800">Swipe right for Got it, left for Review. Build recognition fast.</p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-900">Lekto Matrix</p>
                  <p className="mt-1 text-sm text-emerald-800">Test recall with a hidden word from the same deck.</p>
                </div>
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-sm font-semibold text-rose-900">Sentence Forge</p>
                  <p className="mt-1 text-sm text-rose-800">Write one sentence using a word. Make it sound natural.</p>
                </div>
              </div>
            </div>

            <p className="mt-10 text-xs font-semibold uppercase tracking-wide text-gray-500">Built by</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900">G Nandakishore Reddy</h2>
            <p className="mt-3 max-w-xl text-sm text-gray-600">
              Coefficient is designed to feel clicky, smooth, and practical: recognition, recall, then real usage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/N9601"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black active:scale-[0.99]"
              >
                <ArrowUpRight className="h-4 w-4" />
                Portfolio (GitHub)
              </a>
              <Link
                href="/activities"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.99]"
              >
                <Sparkles className="h-4 w-4 text-blue-700" />
                Explore Activities
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-xl backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Why it works</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-900">Short sessions</p>
                <p className="mt-1 text-sm text-gray-600">A little every day beats a lot once a week.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-900">Recall over recognition</p>
                <p className="mt-1 text-sm text-gray-600">The Matrix makes you retrieve the word, not just see it.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold text-gray-900">Usage makes it stick</p>
                <p className="mt-1 text-sm text-gray-600">Sentence Forge turns “knowing” into “using”.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
