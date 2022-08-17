import {Template} from '@/view/Template';
import {LSidebar} from '@/view/components/IU/LSidebar';
import {RSidebar} from '@/view/components/IU/RSidebar';

class AppContainer extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'section', 'home_section');

    document.title = 'Home';

    new LSidebar(this.element);

    new RSidebar(this.element);
  }
}

export {AppContainer};
