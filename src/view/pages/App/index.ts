import {Sidebar} from '@/view/components/IU/Sidebar';
import {Footer} from '@/view/components/footer';
import {Template} from '@/view/Template';
import {Error} from '@/view/pages/Error';
import {Team} from '@/view/pages/Team';
import {Authorization} from '@/view/pages/Authorization';
import {AppPage, Title} from '@/data/enums';
import {get, set} from '@/data/utils/_storage';
import {Sprint} from '../Sprint';
import {Textbook} from '../Textbook/textbook';
import {AudioCall} from '@/view/pages/AudioCall';
import {Home} from '@/view/pages/Home';
import {Header} from '@/view/components/header';
import {Statistics} from '@/view/pages/Statistics';

class App {
  private static element: HTMLElement = document.body;

  private static defaultID = 'app';

  private header!: Header;

  private _sidebar: Sidebar;

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
      case AppPage.statistics:
        page = new Statistics(App.element);
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
    this._sidebar = new Sidebar(App.element);
    this.footer = new Footer(App.element);
  }

  private async router() {
    const echoLocation = async () => {
      const hash = window.location.hash.replace('#', '/').slice(1);

      if (this.footer) this.footer.removeElement();

      this.footer = await new Footer(App.element);

      if (hash === AppPage.home) {
        App.init(AppPage.home);
        document.title = Title.home;
      } else if (hash === AppPage.team) {
        App.init(AppPage.team);
        document.title = Title.team;
      } else if (hash === AppPage.authorization) {
        App.init(AppPage.authorization);
        document.title = Title.authorization;
      } else if (hash === AppPage.book) {
        App.init(AppPage.book);
        document.title = Title.book;
      } else if (hash === AppPage.audiocall) {
        document.title = Title.audiocall;
        App.init(AppPage.audiocall);
        this.footer.removeElement();
        document.title = Title.audiocall;
      } else if (hash === AppPage.sprint) {
        App.init(AppPage.sprint);
        document.title = Title.sprint;
        this.footer.removeElement();
      } else if (hash === AppPage.statistics) {
        App.init(AppPage.statistics);
        document.title = Title.statistics;
      } else {
        this.error = new Error(App.element);
      }

      return hash;
    };

    window.onhashchange = () => echoLocation();
  }

  private storage() {
    const storage = get('page');

    if (storage) {
      App.init(storage);
    } else {
      App.init(AppPage.home);
    }

    window.onbeforeunload = () => set('page', window.location.hash.slice(1).replace('#', '/'));
  }

  async render() {
    this.storage();
    await this.router();
  }
}

export {App};
