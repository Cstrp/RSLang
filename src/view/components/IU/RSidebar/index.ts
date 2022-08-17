import {Template} from '@/view/Template';
import style from './index.module.scss';

class RSidebar extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.sidebar);
  }
}

export {RSidebar};
