import {LSidebar} from '@/view/components/IU/LSidebar';
import {Footer} from '@/view/components/footer';
import {Template} from '@/view/Template';
import {Error} from '@/view/pages/Error';
import {Team} from '@/view/pages/Team';
import {Authorization} from '@/view/pages/Authorization';
import {AppPage} from '@/data/enums';
import {get, set} from '@/data/utils/_storage';
import {Sprint} from '../Sprint';
import {Textbook} from '../Textbook/textbook';
import {AudioCall} from '@/view/pages/AudioCall';
import {Home} from '@/view/pages/home';
import {Header} from '@/view/components/header';

class App {
  private static element: HTMLElement = document.body;

  private static defaultID = 'app';

  private header!: Header;

  private _sidebar: LSidebar;

  private footer!: Footer;

  private error!: Error;

  private static init(id: string) {
    const app = document.querySelector(`#${App.defaultID}`);

    if (app) app.remove();

    let page: Template | Textbook | Sprint | null;

    switch (id) {
      case AppPage.home:
        page = new Home(App.element);
        break;
      case AppPage.team:
        page = new Team(App.element);
        break;
      case AppPage.authorization:
        page = new Authorization(App.element);
        break;
      case AppPage.book:
        page = new Textbook(App.element);
        break;
      case AppPage.audiocall:
        page = new AudioCall(App.element);
        break;
      case AppPage.sprint:
        page = new Sprint(App.element);
        break;
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
    this.footer = new Footer(App.element);
  }

  private router() {
    const echoLocation = async () => {
      const hash = window.location.hash.replace('#', '/').slice(1);

      if (hash === AppPage.home) {
        App.init(AppPage.home);
      } else if (hash === AppPage.team) {
        App.init(AppPage.team);
      } else if (hash === AppPage.authorization) {
        App.init(AppPage.authorization);
      } else if (hash === AppPage.book) {
        App.init(AppPage.book);
      } else if (hash === AppPage.audiocall) {
        App.init(AppPage.audiocall);
      } else if (hash === AppPage.sprint) {
        App.init(AppPage.sprint);
      } else {
        this.error = new Error(App.element);
      }

      if (this.footer) {
        this.footer.removeElement();
      }

      this.footer = await new Footer(App.element);

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
