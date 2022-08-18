import {Template} from '@/view/Template';
import style from './index.module.scss';

class Footer extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'footer', style.footer);
    const wrapper = new Template(this.element, 'div', style.wrapper);

    const mainCat = new Template(wrapper.element, 'div', style.rs);

    new Template(mainCat.element, 'a', style.link, '© RSchool 2022', {
      href: 'https://rs.school/',
      title: 'RS_School',
    });

    const community = new Template(mainCat.element, 'a', null, null, {
      href: 'https://wearecommunity.io/communities/the-rolling-scopes',
      title: 'Best of the Best O_o',
    });

    new Template(community.element, 'img', null, null, {
      src: 'https://rollingscopes.com/images/logo_rs_text.svg',
    });

    const firstCat = new Template(wrapper.element, 'div', style.cat);
    const first = new Template(firstCat.element, 'a', null, null, {
      href: 'https://github.com/Cstrp',
      title: 'Crazy Cat',
    });

    new Template(first.element, 'img', null, null, {
      src: 'https://cdn.worldvectorlogo.com/logos/github-icon.svg',
    });

    const secondCat = new Template(wrapper.element, 'div', style.cat);
    const second = new Template(secondCat.element, 'a', null, null, {
      href: 'https://github.com/radiance77',
      title: 'Cat :3',
    });

    new Template(second.element, 'img', null, null, {
      src: 'https://www.pngkey.com/png/detail/178-1787508_github-icon-download-at-icons8-white-github-icon.png',
    });

    const thirdCat = new Template(wrapper.element, 'div', style.cat);
    const third = new Template(thirdCat.element, 'a', null, null, {
      href: 'https://github.com/vpeacock',
      title: 'Cat ^_^',
    });

    new Template(third.element, 'img', null, null, {
      src: 'https://w7.pngwing.com/pngs/321/703/png-transparent-computer-icons-github-logo-github-monochrome-rim-black-and-white.png',
    });
  }
}

export {Footer};
