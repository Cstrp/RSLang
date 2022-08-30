import {Template} from '@/view/Template';
import style from './index.module.scss';

class Home extends Template {
  private wrapper: Template = new Template(this.element, 'div', style.wrapper);

  public constructor(parent: HTMLElement) {
    super(parent, 'main', style.main);

    new Template(
      this.wrapper.element,
      'pre',
      style.root,
      `Изучай 
    английский 
      вместе с RS LANG`,
    );

    const description = new Template(this.wrapper.element, 'div', null);

    new Template(
      description.element,
      'p',
      style.text,
      `RSLang - платформа для изучения английского языка с разными подходами для достижения результата в максимально
        короткий срок.`,
    );

    new Template(this.wrapper.element, 'img', null, null, {
      src: 'https://elsaspeak.net/wp-content/uploads/2018/04/spoken-english-app-01-1024x575.jpg',
    });
  }
}

// https://elsaspeak.net/wp-content/uploads/2018/04/spoken-english-app-01-1024x575.jpg

export {Home};
