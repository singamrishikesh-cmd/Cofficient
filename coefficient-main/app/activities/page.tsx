import Link from 'next/link';
import { BookOpenCheck, ChevronRight, Crosshair, LibraryBig, PencilLine, Zap } from 'lucide-react';

const ActivityCard = ({
  title,
  description,
  href,
  icon,
  badge,
}: {
  title: string;
  description: string;
  href?: string;
  icon: React.ReactNode;
  badge: { label: string; tone: 'blue' | 'emerald' | 'indigo' | 'rose' | 'gray' };
}) => {
  const tones: Record<typeof badge.tone, { badge: string; border: string }> = {
    blue: { badge: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
    emerald: { badge: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200' },
    indigo: { badge: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-200' },
    rose: { badge: 'bg-rose-50 text-rose-700', border: 'border-rose-200' },
    gray: { badge: 'bg-gray-100 text-gray-700', border: 'border-gray-200' },
  };

  const content = (
    <div className={`rounded-2xl border bg-white p-6 shadow-xl transition hover:-translate-y-0.5 ${tones[badge.tone].border}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="text-blue-600">{icon}</div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${tones[badge.tone].badge}`}>
          {badge.label}
        </span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      {href ? (
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
          Open <ChevronRight className="h-4 w-4" />
        </div>
      ) : (
        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-gray-500">Coming soon</p>
      )}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};

export default function ActivitiesPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Activities</p>
              <h1 className="mt-1 text-3xl font-semibold text-gray-900">Practice Modes</h1>
              <p className="mt-2 text-sm text-gray-600">
                Mix recognition, recall, and usage so words stick in real life.
              </p>
            </div>
            <Link
              href="/home"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ActivityCard
            title="Swipe Deck"
            description="Fast recognition and confidence tagging for 5 daily words."
            href="/learn"
            icon={<BookOpenCheck className="h-6 w-6" />}
            badge={{ label: 'Daily', tone: 'blue' }}
          />
          <ActivityCard
            title="Lekto Matrix"
            description="Wordle-style recall test using the same daily deck."
            href="/matrix"
            icon={<Crosshair className="h-6 w-6" />}
            badge={{ label: 'Recall', tone: 'emerald' }}
          />
          <ActivityCard
            title="Word Library"
            description="Search 200+ words with definitions and synonyms."
            href="/library"
            icon={<LibraryBig className="h-6 w-6" />}
            badge={{ label: 'Explore', tone: 'indigo' }}
          />
          <ActivityCard
            title="Sentence Forge"
            description="Turn a word into a sentence from a short prompt."
            href="/forge"
            icon={<PencilLine className="h-6 w-6" />}
            badge={{ label: 'Practice', tone: 'rose' }}
          />
          <ActivityCard
            title="Speed Drill"
            description="Rapid-fire definitions for high reps in 3 minutes."
            icon={<Zap className="h-6 w-6" />}
            badge={{ label: 'Soon', tone: 'gray' }}
          />
        </section>
      </div>
    </main>
  );
}
