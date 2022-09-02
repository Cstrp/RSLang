import {Template} from '@/view/Template';
import style from './index.module.scss';

class StatContent extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.wrapper);
  }
}

export {StatContent};
