import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Clock} from '@/data/utils/_clock';
import {get} from '@/data/utils/_storage';

class Header extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'header', style.header);

    new Template(this.element, 'div', style.greeting, `${this.greeting()}`);
  }

  greeting(): string {
    const date: Date = new Date();
    const time: number = date.getHours();

    let greeting: string = '';

    if (time < 12) {
      greeting = `Good morning ${get('userName') ? get('userName') : ''} ! Перевод: Доброе утро ${
        get('userName') ? get('userName') : ''
      } !`;
    } else if (time >= 12 && time <= 17) {
      greeting = `Have a good day ${get('userName') ? get('userName') : 'mate'} ! Перевод: "Хорошего дня ${
        get('userName') ? get('userName') : 'Приятель'
      }!"`;
    } else if (time >= 17 && time <= 22) {
      greeting = `Good evening! ${get('userName') ? get('userName') : ''} Перевод: "Добрый вечер"`;
    } else if (time <= 23) greeting = 'Good night! Good luck!';

    new Clock(this.element);

    return greeting;
  }
}

export {Header};
