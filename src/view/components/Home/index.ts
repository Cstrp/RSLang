import {Template} from '@/view/Template';

class AppContainer extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'section', 'home_section');

    document.title = 'Home';
  }
}

export {AppContainer};
