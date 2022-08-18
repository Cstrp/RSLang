import {Template} from '@/view/Template';
import style from './index.module.scss';

class Home extends Template {
  private wrapper: Template = new Template(this.element, 'div', 'wrapper');

  constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);

    this.lead();
    this.firstDeveloper();
    this.secondDeveloper();
  }

  private lead() {
    new Template(this.wrapper.element, 'div', '123');
  }

  private firstDeveloper() {
    new Template(this.wrapper.element, 'div', '321');
  }

  private secondDeveloper() {
    new Template(this.wrapper.element, 'div', 'Hello');
  }
}
export {Home};
