import {Template} from '@/view/Template';
import {Home_Wrapper} from '@/view/components/Home';

class Home extends Template {
  private wrapper = new Home_Wrapper(this.element);

  constructor(parent: HTMLElement) {
    super(parent, 'section', 'home_section');
  }
}

export {Home};
