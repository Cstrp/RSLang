import {Template} from '@/view/Template';
import {Button} from '@/view/components/IU/Button';
import {Popup} from '@/view/components/popup';
import {Title} from '@/data/enums';
import {IActivity} from '@/data/interfaces/IStatistics';
import style from './index.module.scss';

class Statistics extends Template {
  private leftBlock: Template = new Template(this.element, 'div', style.wrapper);

  protected audioPopup!: Button;

  protected sprintPopup!: Button;

  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);

    document.title = Title.statistics;

    new Template(this.leftBlock.element, 'p', style.text, '💥 Общая статистика => ');

    this.getStudiedWords();
    this.getDifficultWords();
    this.getTotalAudioStat();
    this.getTotalSprintStat();
    this.getGameStat();
  }

  private getGameStat() {
    this.audioPopup = new Button(this.leftBlock.element, style.btn, 'Aудио вызов', false, 'button');
    this.audioPopup.onClick = () => new Popup(this.element).getAudioStat();

    this.sprintPopup = new Button(this.leftBlock.element, style.btn, 'Спринт', false, 'button');
    this.sprintPopup.onClick = () => new Popup(this.element).getSpringStat();
  }

  private getTotalAudioStat() {
    const res: string | null = window.localStorage.getItem('audio-call-score')
      ? window.localStorage.getItem('audio-call-score')
      : '0';

    const data: [] = res ? JSON.parse(res) : [];

    const total: number = data.reduce((acc: number, i: number) => acc + i, 0);

    new Template(this.leftBlock.element, 'p', style.text, `Всего баллов (${IActivity.audioCall}): ${total}`);
    new Template(this.leftBlock.element, 'p', style.text, `Количество попыток: ${data.length ? data.length : 0}`);
  }

  private getTotalSprintStat() {
    const data = window.localStorage.getItem('sprint-score') ? window.localStorage.getItem('sprint-score') : '0';

    const res = data ? JSON.parse(data) : [];

    const total = res.reduce((acc: number, i: number) => acc + i, 0);

    new Template(this.leftBlock.element, 'p', style.text, `Всего баллов (${IActivity.sprint}): ${total}`);
    new Template(this.leftBlock.element, 'p', style.text, `Количество попыток: ${res.length ? res.length : 0} `);
  }

  private getStudiedWords() {
    new Template(this.leftBlock.element, 'p', style.text, '🌎 Общее количество выученных слов: ');
  }

  private getDifficultWords() {
    new Template(this.leftBlock.element, 'p', style.text, '🧠 Общее количество слов отмеченных как "сложные":');
  }
}

export {Statistics};
