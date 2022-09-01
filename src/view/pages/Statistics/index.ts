import {Template} from '@/view/Template';
import style from './index.module.scss';

class Statistics extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);
  }
}

export {Statistics};
