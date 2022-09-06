import {Template} from '@/view/Template';
import style from './index.module.scss';

class Team extends Template {
  private wrapper: Template = new Template(this.element, 'div', style.team);

  constructor(parent: HTMLElement) {
    super(parent, 'main', null);

    this.lead();
    this.firstDeveloper();
    this.secondDeveloper();
  }

  private lead() {
    const container = new Template(this.wrapper.element, 'div', style.developers);
    const header = new Template(container.element, 'div', style.header);

    new Template(header.element, 'img', style.img, null, {
      src: 'https://avatars.githubusercontent.com/u/86977555?s=400&u=1e27623c7328e07bc60228f74bc6bce37d8172c6&v=4',
    });
    new Template(header.element, 'h3', style.title, 'Team Lead (Valera)');
    const body = new Template(container.element, 'div', style.body);
    const link = new Template(body.element, 'a', style.link, null, {
      href: 'https://github.com/Cstrp',
    });

    new Template(link.element, 'img', style.img, null, {
      src: 'https://cdn.worldvectorlogo.com/logos/github-icon.svg',
    });

    new Template(
      body.element,
      'pre',
      style.text,
      `Фронтенд разработчик
1. Backend, общая архитектура проекта 
2. Авторизация, раздел о команде
3. Страница статистики
4. Ел печенье, запивал чаем
    `,
    );
  }

  private firstDeveloper() {
    const container = new Template(this.wrapper.element, 'div', style.developers);
    const header = new Template(container.element, 'div', style.header);

    new Template(header.element, 'img', style.img, null, {
      src: 'https://avatars.githubusercontent.com/u/64599422?v=4',
    });
    new Template(header.element, 'h3', style.title, 'Developer (Angelina)');
    const body = new Template(container.element, 'div', style.body);

    const link = new Template(body.element, 'a', style.link, null, {
      href: 'https://github.com/radiance77',
    });

    new Template(link.element, 'img', style.img, null, {
      src: 'https://cdn.worldvectorlogo.com/logos/github-icon.svg',
    });

    new Template(
      body.element,
      'pre',
      style.text,
      `Фронтенд разработчик
1. Функционал учебника
2. Функционал игры "Аудиовызов"
3. Дизайн игры "Аудиовызов"`,
    );
  }

  private secondDeveloper() {
    const container = new Template(this.wrapper.element, 'div', style.developers);
    const header = new Template(container.element, 'div', style.header);

    new Template(header.element, 'img', style.img, null, {
      src: 'https://avatars.githubusercontent.com/u/64298715?v=4',
    });
    new Template(header.element, 'h3', style.title, 'Developer (Valentina)');
    const body = new Template(container.element, 'div', style.body);

    const link = new Template(body.element, 'a', style.link, null, {
      href: 'https://github.com/vpeacock',
    });

    new Template(link.element, 'img', style.img, null, {
      src: 'https://cdn.worldvectorlogo.com/logos/github-icon.svg',
    });

    new Template(
      body.element,
      'pre',
      style.text,
      `Фронтенд разработчик
1. Функционал учебника
2. Функционал игры "Спринт" 
3. Дизайн игры "Спринт"`,
    );
  }
}

export {Team};
