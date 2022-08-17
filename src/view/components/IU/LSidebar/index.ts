import {Template} from '@/view/Template';
import style from './index.module.scss';
import {link} from '@/data/const';

class LSidebar extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', style.sidebar);

    const title = new Template(this.element, 'div', style.sidebar_wrapper);

    new Template(title.element, 'h3', '123', 'RS_Lang');

    const links = new Template(this.element, 'div', style.sidebar_wrapper);

    new Template(links.element, 'a', style.sidebar_link, 'Домашнаяя страница', {href: link.links.home});

    new Template(links.element, 'a', style.sidebar_link, 'Электронный учебник', {href: link.links.book});

    new Template(links.element, 'a', style.sidebar_link, 'Аудио вызов', {href: link.links.audiocall});

    new Template(links.element, 'a', style.sidebar_link, 'Спринт', {href: link.links.sprint});

    new Template(links.element, 'a', style.sidebar_link, 'Статистика', {href: link.links.statistics});

    const authorization = new Template(this.element, 'div', '1');

    new Template(authorization.element, 'a', style.sidebar_link, 'Зарегистрироваться', {
      href: link.links.authorization,
    });
  }
}

export {LSidebar};
