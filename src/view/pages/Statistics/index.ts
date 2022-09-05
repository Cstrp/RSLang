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

  private getTotalAudioStat() {
    const data: [] = get('audio-call-score');

    const total: number = data.reduce((acc: number, i: number) => acc + i, 0);

    new Template(this.leftBlock.element, 'p', style.text, `Всего баллов (${IActivity.audioCall}): ${total}`);
    new Template(this.leftBlock.element, 'p', style.text, `Количество попыток: ${data.length ? data.length : 0}`);
  }

  private getTotalSprintStat() {
    const data = get('sprint-score');

    const total = data.reduce((acc: number, i: number) => acc + i, 0);

    new Template(this.leftBlock.element, 'p', style.text, `Всего баллов (${IActivity.sprint}): ${total}`);
    new Template(this.leftBlock.element, 'p', style.text, `Количество попыток: ${data.length ? data.length : 0} `);
  }

  private getStudiedWords() {
    const data = get('studied-words');

    new Template(this.leftBlock.element, 'p', style.text, `🌎 Общее количество выученных слов: ${data.length}`);
  }

  private getDifficultWords() {
    const data = get('difficult-words');

    new Template(
      this.leftBlock.element,
      'p',
      style.text,
      `🧠 Общее количество слов отмеченных как "сложные": ${data[0].length}`,
    );
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
