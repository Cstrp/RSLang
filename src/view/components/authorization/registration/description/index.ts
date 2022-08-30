import {Template} from '@/view/Template';
import {description} from '@/data/const';
import style from './index.module.scss';

class Description extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.description);

    const ul = new Template(this.element, 'ul', style.list);

    description.forEach((i) => {
      new Template(ul.element, 'li', style.listItem, `${i}`);
    });
  }
}

export {Description};
