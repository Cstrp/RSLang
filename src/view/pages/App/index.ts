import {LSidebar} from '@/view/components/IU/LSidebar';
import {RSidebar} from '@/view/components/IU/RSidebar';
import {Header} from '@/view/components/header';

class App {
  private static element: HTMLElement = document.body;

  private static defaultID = 'app';

  private _sidebar!: LSidebar;

  private sidebar_!: RSidebar;

  private header!: Header;

  constructor() {
    this.header = new Header(App.element);
    this._sidebar = new LSidebar(App.element);
    this.sidebar_ = new RSidebar(App.element);
  }

  render() {
    return App.element;
  }
}

export {App};
