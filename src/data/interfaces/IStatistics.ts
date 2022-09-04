const enum IGame {
  sprint,
  audioCall,
}

interface IStatistics {
  rightWords: number;
  wrongWords: number;
  newWordsOfDay?: number | string;
  totalCountOfWords: number;
  game?: IGame;
}

interface IStatisticsResponse {
  optional: {[key: string]: IStatistics};
}

export {IStatisticsResponse, IStatistics, IGame};
