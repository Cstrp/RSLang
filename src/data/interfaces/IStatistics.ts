const enum IActivity {
  sprint = 'Спринт',
  audioCall = 'Аудио вызов',
  book = 'Книга',
}

interface RootObject {
  learnedWords: number;
  optional: RootObjectOptional;
}
interface RootObjectOptional {
  [key: string]: number | string;
}

export {IActivity, RootObject, RootObjectOptional};
