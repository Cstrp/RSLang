const enum IActivity {
  sprint,
  audioCall,
  book,
}

interface IStatisticsResponse {
  learnedWords?: number;
  optional: {[key: string]: IStatistics};
}
interface IStatistics {
  rightWords: number;
  wrongWords: number;
  newWordsOfDay?: number | string;
  totalCountOfWords: number;
  game?: IActivity;
}

export {IStatisticsResponse, IStatistics, IActivity};
