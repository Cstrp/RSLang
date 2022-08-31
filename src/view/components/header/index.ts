import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Clock} from '@/data/utils/_clock';
import {get} from '@/data/utils/_storage';

class Header extends Template {
  private static textObj = {
    morning: `Good morning ! Dear ${get('userName') ? get('userName') : 'mate'}`,

    day: `Have a good day ! Dear ${get('userName') ? get('userName') : 'mate'}`,

    evening: `Good evening ! Dear ${get('userName') ? get('userName') : 'mate'}`,

    night: `Good night! Good luck! ${get('userName') ? get('userName') : 'mate'}`,
  };

  private readonly greet: Template;

  constructor(parent: HTMLElement) {
    super(parent, 'header', style.header, null, {id: 'header'});

    this.greet = new Template(this.element, 'div', style.greeting, `${this.greeting()}`);
  }

  greeting(): string {
    const date: Date = new Date();
    const time: number = date.getHours();

    let greet: string = '';

    if (time < 12) greet = Header.textObj.morning;

    if (time >= 12 && time <= 17) greet = Header.textObj.day;

    if (time >= 17 && time <= 22) greet = Header.textObj.evening;

    if (time <= 23) greet = Header.textObj.night;

    new Clock(this.element);

    return greet;
  }
}

export {Header};
