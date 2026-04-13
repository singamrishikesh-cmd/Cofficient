import type { CoefficientWord } from '../types';

export const containsWholeWord = (sentence: string, word: string): boolean => {
  const safe = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\b${safe}\\b`, 'i');
  return re.test(sentence);
};

export const scoreSentence = (
  sentence: string,
  word: Pick<CoefficientWord, 'word'>,
): { ok: boolean; message: string } => {
  const trimmed = sentence.trim();
  if (trimmed.length < 12) {
    return { ok: false, message: 'Make it a full sentence (a bit longer).' };
  }
  if (!/[.!?]$/.test(trimmed)) {
    return { ok: false, message: 'Add punctuation at the end (., !, or ?).' };
  }
  if (!containsWholeWord(trimmed, word.word)) {
    return { ok: false, message: `Include the word “${word.word}” in your sentence.` };
  }
  return { ok: true, message: 'Nice. This reads like real usage.' };
};

