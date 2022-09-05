import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Button} from '@/view/components/IU/Button';
import {get} from '@/data/utils/_storage';
import {IDayStatistic} from '@/data/interfaces/IDayStatistic';

class Popup extends Template {
  private closePopup() {
    this.element.remove();
  }

  private audioWrapper: Template = new Template(this.element, 'div', style.audio);

  private sprintWrapper: Template = new Template(this.element, 'div', style.sprint);

  protected btn: Button = new Button(this.element, style.btn, 'Закрыть', false, 'button');

  constructor(parent: HTMLElement) {
    super(parent, 'div', style.popup);

    this.btn.onClick = () => this.closePopup();

    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        this.closePopup();
      }
    });
  }

  public getAudioStat() {
    const res = window.localStorage.getItem('audio-call-score') ? window.localStorage.getItem('audio-call-score') : '0';

    const data = res ? JSON.parse(res) : [];

    if (data.length) {
      data.forEach((i: string, idx: string) => {
        new Template(this.audioWrapper.element, 'p', style.text, `${idx + 1}-я игра: ${i} баллов`);
      });
    } else {
      new Template(this.audioWrapper.element, 'p', style.text, 'Пока статистики по игре нет');
    }

    this.getAudioStatOfDay();
  }

  private getAudioStatOfDay() {
    const data: Array<IDayStatistic> = get('day-statistics');

    const audioStat = new Template(this.audioWrapper.element, 'div', style.audioStat);

    new Template(audioStat.element, 'p', style.text, 'Статистика по дням');

    if (data) {
      data.forEach((i) => {
        new Template(
          audioStat.element,
          'p',
          style.audioStatText,
          `По состоянию на: ${i.date}, получено баллов за игру: ${i.audioCallScore}. Всего сыграно игр: ${i.audioCall}`,
        );
      });
    }
  }

  public getSpringStat() {
    const res = window.localStorage.getItem('sprint-score') ? window.localStorage.getItem('sprint-score') : '0';

    const data = res ? JSON.parse(res) : [];

    if (data.length) {
      data.forEach((i: string, idx: string) => {
        new Template(this.sprintWrapper.element, 'p', style.text, `${idx + 1}-я игра: ${i} баллов`);
      });
    } else {
      new Template(this.sprintWrapper.element, 'p', style.text, 'Пока статистики по игре нет');
    }

    this.getSpringStatOfDay();
  }

  private getSpringStatOfDay() {
    const data: Array<IDayStatistic> = get('day-statistics');

    const audioStat = new Template(this.sprintWrapper.element, 'div', style.audioStat);

    new Template(audioStat.element, 'p', style.text, 'Статистика по дням');

    if (data) {
      data.forEach((i) => {
        new Template(
          audioStat.element,
          'p',
          style.audioStatText,
          `По состоянию на: ${i.date}, получено баллов за игру: ${i.sprintScore}. Всего сыграно игр: ${i.sprint}`,
        );
      });
    }
  }
}

export {Popup};
