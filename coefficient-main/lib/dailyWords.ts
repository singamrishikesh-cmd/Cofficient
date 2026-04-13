import type { CoefficientWord, DailyVariables } from '../types';
import { WORD_BANK } from './wordBank';

const DAILY_WORD_COUNT = 5;

const toDaySeed = (date: Date): number => {
  const key = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z]/g, '');

const rotateBank = (seed: number, bank: CoefficientWord[]): CoefficientWord[] => {
  const start = seed % bank.length;
  return [...bank.slice(start), ...bank.slice(0, start)];
};

const groupByLength = (bank: CoefficientWord[]): Map<number, CoefficientWord[]> => {
  const groups = new Map<number, CoefficientWord[]>();
  for (const entry of bank) {
    const normalized = normalize(entry.word);
    const length = normalized.length;
    if (length < 4 || length > 12) continue;
    const list = groups.get(length) ?? [];
    list.push(entry);
    groups.set(length, list);
  }
  return groups;
};

export const getDailyVariables = (date: Date = new Date()): DailyVariables => {
  const seed = toDaySeed(date);
  const groups = groupByLength(WORD_BANK);
  const validLengths = Array.from(groups.entries())
    .filter(([, list]) => list.length >= DAILY_WORD_COUNT)
    .map(([length]) => length)
    .sort((a, b) => a - b);

  if (validLengths.length === 0) {
    return rotateBank(seed, WORD_BANK).slice(0, DAILY_WORD_COUNT);
  }

  const chosenLength = validLengths[seed % validLengths.length];
  const bucket = groups.get(chosenLength) ?? WORD_BANK;
  return rotateBank(seed, bucket).slice(0, DAILY_WORD_COUNT);
};

export const getDailyWordStream = (date: Date = new Date()): CoefficientWord[] => {
  const seed = toDaySeed(date);
  const groups = groupByLength(WORD_BANK);
  const validLengths = Array.from(groups.entries())
    .filter(([, list]) => list.length >= DAILY_WORD_COUNT)
    .map(([length]) => length)
    .sort((a, b) => a - b);

  if (validLengths.length === 0) {
    return rotateBank(seed, WORD_BANK);
  }

  const chosenLength = validLengths[seed % validLengths.length];
  const bucket = groups.get(chosenLength) ?? WORD_BANK;
  return rotateBank(seed, bucket);
};

export const getDailySecretWord = (dailyWords: DailyVariables, date: Date = new Date()): CoefficientWord => {
  const seed = toDaySeed(date);
  return dailyWords[seed % dailyWords.length];
};

export const getDailySpotlightWords = (count: number, date: Date = new Date()): CoefficientWord[] => {
  const seed = toDaySeed(date) + 1337;
  const rotated = rotateBank(seed, WORD_BANK);
  return rotated.slice(0, Math.max(0, count));
};
