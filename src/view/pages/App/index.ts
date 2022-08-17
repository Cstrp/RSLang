import {Error} from '@/view/pages/Error';
import {LSidebar} from '@/view/components/IU/LSidebar';
import {RSidebar} from '@/view/components/IU/RSidebar';

class App {
  private static element: HTMLElement = document.body;

  private static defaultID = 'app';

  private error!: Error;

  private _sidebar!: LSidebar;

  private sidebar_!: RSidebar;

  constructor() {
    this._sidebar = new LSidebar(App.element);
    this.sidebar_ = new RSidebar(App.element);
  }

  render() {
    return App.element;
  }
}

export {App};
