import {timer} from '@/data/types';
import {Template} from '@/view/Template';
import style from './index.module.scss';

class Clock extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.clock, null, {id: 'clock'});
    setInterval(() => this.clock(), 1000);
  }

  clock() {
    const date: Date = new Date();
    let hours: timer = date.getHours().toString();
    let minutes: timer = date.getMinutes().toString();
    let seconds: timer = date.getSeconds().toString();

    if (hours.length < 2) hours = `0${hours}`;
    if (minutes.length < 2) minutes = `0${minutes}`;
    if (seconds.length < 2) seconds = `0${seconds}`;

    this.element.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

export {Clock};
