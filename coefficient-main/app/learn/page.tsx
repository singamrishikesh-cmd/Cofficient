import LearnClient from './LearnClient';
import { getDailyVariables, getDailyWordStream } from '../../lib/dailyWords';

export const dynamic = 'force-dynamic';

export default function LearnPage() {
  const dailyWords = getDailyVariables();
  const stream = getDailyWordStream();
  return <LearnClient dailyWords={dailyWords} stream={stream} />;
}

