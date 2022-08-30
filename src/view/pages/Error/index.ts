import style from './index.module.scss';
import {Template} from '@/view/Template';

class Error extends Template {
  public constructor(parent: HTMLElement) {
    super(parent, 'div', style.wrapper);

    this.element.style.overflow = 'hidden';
    new Template(this.element, 'h2', style.error, '404:   Error! Page is not found...');

    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      document.body.innerHTML = '';
    }, 10000);
  }
}

export {Error};
