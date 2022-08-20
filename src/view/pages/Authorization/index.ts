import {Template} from '@/view/Template';
import style from './index.module.scss';
import {AuthOptions} from '@/view/components/authorization/registration';

class Authorization extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);
    new AuthOptions(this.element);
  }
}

export {Authorization};
