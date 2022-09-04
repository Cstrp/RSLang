import {Template} from '@/view/Template';
import style from './index.module.scss';
import {get} from '@/data/utils/_storage';

class Statistics extends Template {
  protected leftBlock: Template;

  protected rightBlock: Template;

  private static dayStats = {
    audio: get('audio-call-score') ? get('audio-call-score') : '0',
    sprint: get('sprint-score') ? get('sprint-score') : '0',
    studiedWords: get('studied-words') ? get('studied-words') : '0',
    difficultWords: get('difficult-words') ? get('difficult-words') : '0',
  };

  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);

    this.leftBlock = new Template(this.element, 'div', style.wrapper);

    this.rightBlock = new Template(this.element, 'div', style.wrapper);

    new Template(this.leftBlock.element, 'p', style.text, 'Статистика за день');

    new Template(this.rightBlock.element, 'p', style.text, 'Статистика за все время');

    this.getStudiedWords();

    this.getDifficultWords();

    this.getAudioStat();

    this.getSpringStat();
  }

  private getStudiedWords() {
    new Template(
      this.leftBlock.element,
      'p',
      style.text,
      `Кол-во выученных слов: ${Statistics.dayStats.studiedWords.length}`,
    );
  }

  private getDifficultWords() {
    new Template(
      this.leftBlock.element,
      'p',
      style.text,
      `Кол-во сложных слов: ${Statistics.dayStats.difficultWords.length}`,
    );
  }

  private getAudioStat() {
    const audioWrapper = new Template(this.leftBlock.element, 'div', style.audio);

    const data: number = <number>(<unknown>Statistics.dayStats.audio);

    [data].forEach((i) => {
      new Template(audioWrapper.element, 'p', style.text, `Аудио вызов: ${i} баллов`);
    });
  }

  private getSpringStat() {
    const sprintWrapper = new Template(this.leftBlock.element, 'div', style.sprint);

    const data: string = Statistics.dayStats.sprint;

    [data].forEach((i) => {
      new Template(sprintWrapper.element, 'p', style.text, `Спринт: ${i} баллов`);
    });
  }
}

export {Statistics};
