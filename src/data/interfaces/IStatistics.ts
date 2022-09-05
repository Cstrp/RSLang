import {IDayStatistic} from '@/data/interfaces/IDayStatistic';

const enum IActivity {
  sprint = 'Спринт',
  audioCall = 'Аудио вызов',
  book = 'Книга',
}

interface IStatistics {
  learnedWords?: number;
  optional: {
    [key: string]: IDayStatistic;
  };
}

export {IActivity, IStatistics};
