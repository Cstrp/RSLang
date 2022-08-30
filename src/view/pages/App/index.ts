import {LSidebar} from '@/view/components/IU/LSidebar';
import {RSidebar} from '@/view/components/IU/RSidebar';
import {Header} from '@/view/components/header';
import {Footer} from '@/view/components/footer';
import {Template} from '@/view/Template';
import {Error} from '@/view/pages/Error';
import {Home} from '@/view/pages/home';
import {Team} from '@/view/pages/Team';
<<<<<<< HEAD
import {Authorization} from '@/view/pages/Authorization';
=======
>>>>>>> develop
import {AppPage} from '@/data/enums';
import {get, set} from '@/data/utils/_storage';

class App {
  private static element: HTMLElement = document.body;

  private static defaultID = 'app';

  private _sidebar: LSidebar;

  private sidebar_: RSidebar;

  private header: Header;

  private footer: Footer;

  private error!: Error;

  private static init(id: string) {
    const app = document.querySelector(`#${App.defaultID}`);

    if (app) app.remove();

    let page: Template | null;

    switch (id) {
      case AppPage.home:
        page = new Home(App.element);
        break;
      case AppPage.team:
        page = new Team(App.element);
        break;
<<<<<<< HEAD
      case AppPage.authorization:
        page = new Authorization(App.element);
        break;
=======
>>>>>>> develop
      default:
        page = new Home(App.element);
    }

    if (page) {
      const html = page.render();

      html.id = App.defaultID;
      App.element.append(html);
    }
  }

  constructor() {
    this.header = new Header(App.element);
    this._sidebar = new LSidebar(App.element);
    this.sidebar_ = new RSidebar(App.element);
    this.footer = new Footer(App.element);
  }

  private router() {
<<<<<<< HEAD
    const echoLocation = async () => {
=======
    const echoLocation = () => {
>>>>>>> develop
      const hash = window.location.hash.replace('#', '/').slice(1);

      switch (hash) {
        case AppPage.home:
          App.init(AppPage.home);
          break;
        case AppPage.team:
          App.init(AppPage.team);
          break;
<<<<<<< HEAD
        case AppPage.authorization:
          App.init(AppPage.authorization);
          break;
=======
>>>>>>> develop
        default:
          App.init(AppPage.home);
      }

<<<<<<< HEAD
      if (hash !== AppPage.home && hash !== AppPage.team && hash !== AppPage.authorization) {
        this.error = new Error(App.element);
      }

      if (this.footer) this.footer.removeElement();

      this.footer = await new Footer(App.element);
=======
      if (hash !== AppPage.home && hash !== AppPage.team) this.error = new Error(App.element);

      if (this.footer) this.footer.removeElement();

      this.footer = new Footer(App.element);
>>>>>>> develop

      return hash;
    };

    window.onpopstate = () => echoLocation();
  }

  private storage() {
    const storage = get('page');

    if (storage) {
      App.init(storage);
    } else {
      App.init(AppPage.home);
    }

    window.onbeforeunload = () => set('page', window.location.hash.slice(1));
  }

  render() {
    this.storage();
    this.router();
  }
}

export {App};
