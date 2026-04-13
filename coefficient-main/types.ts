// types.ts

export interface CoefficientWord {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb';
  definition: string;
  synonyms: string[];
  example: string;
}

export type DailyVariables = CoefficientWord[];

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface GuessInput {
  letter: string;
  state: LetterState;
}