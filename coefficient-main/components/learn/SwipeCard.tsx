'use client';

import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { CoefficientWord } from '../../types';

interface SwipeCardProps {
  wordData: CoefficientWord;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function SwipeCard({ wordData, onSwipeLeft, onSwipeRight }: SwipeCardProps) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);

  const leftBadgeOpacity = useTransform(x, [-100, -20], [1, 0]);
  const rightBadgeOpacity = useTransform(x, [20, 100], [0, 1]);

  const handleDragEnd = async (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;

    if (info.offset.x > swipeThreshold) {
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.3 } });
      onSwipeRight();
    } else if (info.offset.x < -swipeThreshold) {
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.3 } });
      onSwipeLeft();
    } else {
      controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      animate={controls}
      whileTap={{ scale: 0.98, cursor: "grabbing" }}
      className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 flex flex-col cursor-grab shadow-xl overflow-hidden"
    >
      <motion.div 
        style={{ opacity: rightBadgeOpacity }} 
        className="absolute top-6 right-6 border-2 border-green-500 text-green-600 font-bold px-3 py-1 rounded-md transform rotate-12 pointer-events-none tracking-wider text-sm uppercase"
      >
        Got it
      </motion.div>
      <motion.div 
        style={{ opacity: leftBadgeOpacity }} 
        className="absolute top-6 left-6 border-2 border-red-500 text-red-600 font-bold px-3 py-1 rounded-md transform -rotate-12 pointer-events-none tracking-wider text-sm uppercase"
      >
        Review
      </motion.div>

      <div className="space-y-5 pointer-events-none mt-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">{wordData.word}</h2>
          {wordData.phonetic ? (
            <span className="text-gray-500 font-mono text-sm block mt-1">{wordData.phonetic}</span>
          ) : null}
        </div>
        
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
          {wordData.partOfSpeech}
        </span>
        
        <p className="text-gray-700 text-lg leading-relaxed">
          {wordData.definition || 'Definition coming soon.'}
        </p>
        
        {wordData.example ? (
          <div className="pt-4 mt-auto border-t border-gray-100">
            <p className="text-gray-500 italic text-sm">
              &quot;{wordData.example}&quot;
            </p>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
