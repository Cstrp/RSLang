import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Clock} from '@/data/utils/_clock';
яяяяя
import {get} from '@/data/utils/_storage';

class Header extends Template {
  private static textObj = {
    morning: `Good morning ${get('userName') ? get('userName') : ''} ! Доброе утро ${
      get('userName') ? get('userName') : ''
    } !`,
    day: `Have a good day ${get('userName') ? get('userName') : 'mate'} ! Хорошего дня ${
      get('userName') ? get('userName') : 'Приятель'
    }!"`,
    evening: `Good evening! ${get('userName') ? get('userName') : ''} Добрый вечер"`,
    night: 'Good night! Good luck!',
  };

  private readonly greet: Template;

  private state = {
    morning: '',
    day: '',
    evening: '',
    night: '',
  };

  constructor(parent: HTMLElement) {
    super(parent, 'header', style.header);

    this.greet = new Template(this.element, 'div', style.greeting, `${this.greeting()}`);
=======

class Header extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'header', style.header);

    new Template(this.element, 'div', style.greeting, `${this.greeting()}`);
>>>>>>> develop
  }

  greeting(): string {
    const date: Date = new Date();
    const time: number = date.getHours();

    let greeting: string = '';

    if (time < 12) {
<<<<<<< HEAD
      greeting = Header.textObj.morning;
    } else if (time >= 12 && time <= 17) {
      greeting = Header.textObj.day;
    } else if (time >= 17 && time <= 22) {
      greeting = Header.textObj.evening;
    } else if (time <= 23) greeting = Header.textObj.night;
=======
      greeting = 'Good morning! Перевод: Доброе утро!';
    } else if (time >= 12 && time <= 17) {
      greeting = 'Have a good day mate! Перевод: "Хорошего дня приятель!"';
    } else if (time >= 17 && time <= 22) {
      greeting = 'Good evening! Перевод: "Добрый вечер"';
    } else if (time <= 23) greeting = 'Good night! Good luck!';
>>>>>>> develop

    new Clock(this.element);

    return greeting;
  }
}
<<<<<<< HEAD

=======
>>>>>>> develop
export {Header};
