import {Template} from '@/view/Template';
import style from './index.module.scss';
import {get} from '@/data/utils/_storage';
import {Clock} from '@/data/utils/_clock';

class RSidebar extends Template {
  private static textObj = {
    morning: `Good morning ! Dear ${get('userName') ? get('userName') : 'mate'}`,

    day: `Have a good day ! Dear ${get('userName') ? get('userName') : 'mate'}`,

    evening: `Good evening ! Dear ${get('userName') ? get('userName') : 'mate'}`,

    night: `Good night! Good luck! ${get('userName') ? get('userName') : 'mate'}`,
  };

  private readonly greet!: Template;

  constructor(parent: HTMLElement) {
    super(parent, 'div', style.sidebar);

    this.greet = new Template(this.element, 'div', style.greeting, `${this.greeting()}`);

    new Clock(this.greet.element);
  }

  greeting(): string {
    const date: Date = new Date();
    const time: number = date.getHours();

    let greeting: string = '';

    if (time < 12) {
      greeting = RSidebar.textObj.morning;
    } else if (time >= 12 && time <= 17) {
      greeting = RSidebar.textObj.day;
    } else if (time >= 17 && time <= 22) {
      greeting = RSidebar.textObj.evening;
    } else if (time <= 23) greeting = RSidebar.textObj.night;

    return greeting;
  }
}

export {RSidebar};
