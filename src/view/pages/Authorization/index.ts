import {Template} from '@/view/Template';
import style from './index.module.scss';
import {UserRegistration} from '@/view/components/authorization/registration';
import {Description} from '@/view/components/authorization/registration/description';

class Authorization extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);

    new Description(this.element);
    new UserRegistration(this.element);
  }
}

export {Authorization};
