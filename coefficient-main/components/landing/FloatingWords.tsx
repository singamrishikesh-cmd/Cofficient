'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

type FloatingItem = {
  id: string;
  word: string;
  left: number;
  top: number;
  fontSize: number;
  opacity: number;
  delay: number;
  duration: number;
  blur: boolean;
};

const WORDS = [
  'abate',
  'cogent',
  'laconic',
  'mitigate',
  'prudent',
  'venerate',
  'resolute',
  'ephemeral',
  'meticulous',
  'salient',
  'capricious',
  'tenuous',
  'lucid',
  'austere',
  'candid',
  'cursory',
  'censure',
  'diligent',
  'eloquent',
  'inherent',
  'rhetoric',
  'ubiquity',
  'zenith',
  'nuanced',
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export default function FloatingWords() {
  const [items] = useState<FloatingItem[]>(() => {
    const random = (min: number, max: number) => min + Math.random() * (max - min);
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
    const count = 28;

    const nextItems = Array.from({ length: count }, (_, index) => {
      const word = shuffled[index % shuffled.length];
      const left = clamp(random(2, 98), 2, 98);
      const top = clamp(random(6, 94), 6, 94);
      const fontSize = Math.round(random(12, 26));
      const opacity = Number(random(0.12, 0.24).toFixed(2));
      const delay = Number(random(0, 2.5).toFixed(2));
      const duration = Number(random(6.5, 12).toFixed(2));
      const blur = Math.random() < 0.35;
      return {
        id: `${word}-${index}-${Math.round(left * 10)}-${Math.round(top * 10)}`,
        word,
        left,
        top,
        fontSize,
        opacity,
        delay,
        duration,
        blur,
      };
    });
    return nextItems;
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item) => (
        <motion.span
          key={item.id}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: item.opacity,
            y: [0, -18, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: item.duration,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: item.delay,
          }}
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.fontSize}px`,
            filter: item.blur ? 'blur(0.4px)' : 'none',
          }}
          className="absolute select-none whitespace-nowrap font-medium tracking-wide text-blue-950/90 mix-blend-multiply"
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
}
