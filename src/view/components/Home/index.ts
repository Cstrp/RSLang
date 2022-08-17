import {Template} from '@/view/Template';
import {LSidebar} from '@/view/components/IU/LSidebar';
import {RSidebar} from '@/view/components/IU/RSidebar';

class Home_Wrapper extends Template {
  constructor(parent: HTMLElement) {
    super(parent, 'div', 'wrapper');

    document.title = 'Home';

    new LSidebar(this.element);

    new RSidebar(this.element);
  }
}

export {Home_Wrapper};
