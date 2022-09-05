import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Button} from '@/view/components/IU/Button';

class Popup extends Template {
  private closePopup() {
    this.element.remove();
  }

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
    const audioWrapper = new Template(this.element, 'div', style.audio);

    const res = window.localStorage.getItem('audio-call-score') ? window.localStorage.getItem('audio-call-score') : '0';

    const data = res ? JSON.parse(res) : [];

    if (data.length) {
      data.forEach((i: string, idx: string) => {
        new Template(audioWrapper.element, 'p', style.text, `${idx + 1}-я игра: ${i} баллов`);
      });
    } else {
      new Template(audioWrapper.element, 'p', style.text, 'Пока статистики по игре нет');
    }
  }

  public getSpringStat() {
    const sprintWrapper = new Template(this.element, 'div', style.sprint);

    const res = window.localStorage.getItem('sprint-score') ? window.localStorage.getItem('sprint-score') : '0';

    const data = res ? JSON.parse(res) : [];

    if (data.length) {
      data.forEach((i: string, idx: string) => {
        new Template(sprintWrapper.element, 'p', style.text, `${idx + 1}-я игра: ${i} баллов`);
      });
    } else {
      new Template(sprintWrapper.element, 'p', style.text, 'Пока статистики по игре нет');
    }
  }
}

export {Popup};
