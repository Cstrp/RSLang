import {Template} from '@/view/Template';
import {Button} from '@/view/components/IU/Button';
import {Popup} from '@/view/components/popup';
import {IActivity} from '@/data/interfaces/IStatistics';
import style from './index.module.scss';
import {get} from '@/data/utils/_storage';

class Statistics extends Template {
  private leftBlock: Template = new Template(this.element, 'div', style.wrapper);

  protected audioPopup!: Button;

  protected sprintPopup!: Button;

  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);

    new Template(this.leftBlock.element, 'p', style.text, '💥 Общая статистика => ');

    this.init();
  }

  private getGameStat() {
    this.audioPopup = new Button(this.leftBlock.element, style.btn, 'Aудио вызов', false, 'button');
    this.audioPopup.onClick = () => new Popup(this.element).getAudioStat();

    this.sprintPopup = new Button(this.leftBlock.element, style.btn, 'Спринт', false, 'button');
    this.sprintPopup.onClick = () => new Popup(this.element).getSpringStat();
  }

  private getTotalAudioStat(): string[] {
    const data: [] = get('audio-call-score') ? get('audio-call-score') : [];

    const total: number = data.reduce((acc: number, i: number) => acc + i, 0);

    new Template(this.leftBlock.element, 'p', style.text, `📝 Всего баллов (${IActivity.audioCall}): ${total}`);
    new Template(this.leftBlock.element, 'p', style.text, `📳 Количество попыток: ${data.length ? data.length : 0}`);

    this.dayStat({audioCall: data.length, audioCallScore: total});

    return data;
  }

  private getTotalSprintStat(): string[] {
    const data = get('sprint-score') ? get('sprint-score') : [];

    const total = data.reduce((acc: number, i: number) => acc + i, 0);

    if (data.length) {
      new Template(this.leftBlock.element, 'p', style.text, `📝Всего баллов (${IActivity.sprint}): ${total}`);
      new Template(this.leftBlock.element, 'p', style.text, `📳 Количество попыток: ${data.length ? data.length : 0} `);
    } else {
      new Template(this.leftBlock.element, 'p', style.text, `📝 Всего баллов (${IActivity.sprint}): 0`);
      new Template(this.leftBlock.element, 'p', style.text, '📳 Количество попыток: 0');
    }

    this.dayStat({sprint: data.length, sprintScore: total});

    return data;
  }

  private getStudiedWords(): string[] {
    const data = get('studied-words') ? get('studied-words') : [];

    if (data.length) {
      new Template(this.leftBlock.element, 'p', style.text, `🌎 Общее количество выученных слов: ${data.length}`);
    } else {
      new Template(this.leftBlock.element, 'p', style.text, '🌎 Общее количество выученных слов: 0');
    }

    this.dayStat({studiedWords: data.length});

    return data;
  }

  private getDifficultWords(): string[] {
    const data = get('difficult-words') ? get('difficult-words') : [];

    if (data.length) {
      new Template(
        this.leftBlock.element,
        'p',
        style.text,
        `🧠 Общее количество слов отмеченных как "сложные": ${data[0].length}`,
      );
    } else {
      new Template(this.leftBlock.element, 'p', style.text, '🧠 Общее количество слов отмеченных как "сложные": 0');
    }

    this.dayStat({difficultWords: data.length});

    return data;
  }

  private dayStat(statistics: object) {
    const date: Date = new Date();
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();

    const data = get('day-statistics') ? get('day-statistics') : [];

    const now = `0${day}.0${month}.${year}`;

    const lastItem = data[data.length - 1];

    if (lastItem && lastItem.date === now) {
      data[data.length - 1] = {...lastItem, ...statistics};
    } else {
      data.push({...statistics, date: now});
    }

    localStorage.setItem('day-statistics', JSON.stringify(data));

    return data;
  }

  private init() {
    this.getStudiedWords();
    this.getDifficultWords();
    this.getTotalAudioStat();
    this.getTotalSprintStat();
    this.getGameStat();
  }
}

export {Statistics};
