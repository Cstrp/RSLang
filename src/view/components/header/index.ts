import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Clock} from '@/data/utils/_clock';

class Header extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'header', style.header);
    new Clock(this.element);
    new Template(this.element, 'div', style.greeting, `${this.greeting()}`);
  }

  greeting(): string {
    const date = new Date();
    const time: number = date.getHours();

    let greeting: string = '';

    if (time < 12) {
      greeting = 'Good morning!';
    } else if (time >= 12 && time <= 17) {
      greeting = 'Have a good day mate!';
    } else if (time >= 17 && time <= 24) {
      greeting = 'Good night! Good luck!';
    }

    return greeting;
  }
}
export {Header};
