import MatrixClient from './MatrixClient';
import { getDailySecretWord, getDailyVariables } from '../../lib/dailyWords';

export const dynamic = 'force-dynamic';

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z]/g, '');

export default function MatrixPage() {
  const dailyWords = getDailyVariables();
  const secretEntry = getDailySecretWord(dailyWords);
  const secretWord = normalize(secretEntry.word);
  const validGuesses = dailyWords.map((w) => normalize(w.word));
  return <MatrixClient secretWord={secretWord} validGuesses={validGuesses} />;
}

