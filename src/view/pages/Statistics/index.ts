import {Template} from '@/view/Template';
import style from './index.module.scss';

class Statistics extends Template {
  protected leftBlock: Template;

  protected rightBlock: Template;

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
    new Template(this.leftBlock.element, 'p', style.text, 'Кол-во выученных слов: ');
  }

  private getDifficultWords() {
    new Template(this.leftBlock.element, 'p', style.text, 'Кол-во сложных слов:');
  }

  private getAudioStat() {
    const audioWrapper = new Template(this.leftBlock.element, 'div', style.audio);

    new Template(audioWrapper.element, 'p', style.text, 'Аудиовызов');

    const res = window.localStorage.getItem('audio-call-score') ? window.localStorage.getItem('audio-call-score') : '0';

    const data = res ? JSON.parse(res) : [];

    if (data.length) {
      data.forEach((i: string, idx: string) => {
        new Template(audioWrapper.element, 'p', style.text, `Попытка №_${idx + 1}: ${i} баллов`);
      });
    } else {
      new Template(audioWrapper.element, 'p', style.text, 'Пока нет статистики');
    }
  }

  private getSpringStat() {
    const sprintWrapper = new Template(this.leftBlock.element, 'div', style.sprint);

    new Template(sprintWrapper.element, 'p', style.text, 'Спринт');

    const res = window.localStorage.getItem('sprint-score') ? window.localStorage.getItem('sprint-score') : '0';

    const data = res ? JSON.parse(res) : [];

    if (data.length) {
      data.forEach((i: string, idx: string) => {
        new Template(sprintWrapper.element, 'p', style.text, `Попытка №_${idx + 1}: ${i} баллов`);
      });
    } else {
      new Template(sprintWrapper.element, 'p', style.text, 'Пока нет статистики');
    }
  }
}

export {Statistics};
