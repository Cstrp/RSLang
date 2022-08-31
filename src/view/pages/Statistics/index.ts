import {Template} from '@/view/Template';
import style from './index.module.scss';

class Statistics extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'main', style.wrapper);

    new Template(this.element, 'div', '123');
  }
}

export {Statistics};
