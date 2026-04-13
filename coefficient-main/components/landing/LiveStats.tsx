'use client';

import { motion } from 'framer-motion';

const Stat = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'blue' | 'emerald' | 'indigo' | 'rose';
}) => {
  const toneStyles: Record<typeof tone, string> = {
    blue: 'border-blue-200 bg-gradient-to-br from-white to-blue-50',
    emerald: 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50',
    indigo: 'border-indigo-200 bg-gradient-to-br from-white to-indigo-50',
    rose: 'border-rose-200 bg-gradient-to-br from-white to-rose-50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border px-4 py-3 shadow-md ${toneStyles[tone]}`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
    </motion.div>
  );
};

export default function LiveStats({
  deckSize,
  wordLength,
  libraryLabel,
}: {
  deckSize: number;
  wordLength: number;
  libraryLabel: string;
}) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-4">
      <Stat label="Today" value={`${deckSize} words`} tone="blue" />
      <Stat label="Word length" value={wordLength ? String(wordLength) : '—'} tone="indigo" />
      <Stat label="Recall tries" value="6" tone="emerald" />
      <Stat label="Library" value={libraryLabel} tone="rose" />
    </div>
  );
}
