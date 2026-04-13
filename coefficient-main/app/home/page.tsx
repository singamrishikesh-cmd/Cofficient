import HomeClient from './HomeClient';
import { getDailyVariables } from '../../lib/dailyWords';
import { WORD_BANK } from '../../lib/wordBank';
import { formatCountPlus } from '../../lib/format';

export const dynamic = 'force-dynamic';

const normalize = (value: string): string => value.toLowerCase().replace(/[^a-z]/g, '');

const pickSpotlight = (count: number) => {
  const shuffled = [...WORD_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default function HomePage() {
  const dailyWords = getDailyVariables();
  const deckLength = dailyWords.length ? normalize(dailyWords[0].word).length : 0;
  const spotlight = pickSpotlight(3);

  return (
    <HomeClient
      dailyWords={dailyWords}
      deckLength={deckLength}
      librarySizeLabel={formatCountPlus(WORD_BANK.length, 250)}
      spotlight={spotlight}
    />
  );
}

