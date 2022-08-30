import {LSidebar} from '@/view/components/IU/LSidebar';
import {RSidebar} from '@/view/components/IU/RSidebar';
import {Footer} from '@/view/components/footer';
import {Template} from '@/view/Template';
import {Error} from '@/view/pages/Error';
import {Home} from '@/view/pages/home';
import {Team} from '@/view/pages/Team';
import {Authorization} from '@/view/pages/Authorization';
import {AppPage} from '@/data/enums';
import {get, set} from '@/data/utils/_storage';
import {Sprint} from '../Sprint';
import {Textbook} from '../Textbook/textbook';

class App {
  private static element: HTMLElement = document.body;

  private static defaultID = 'app';

  public _sidebar: LSidebar;

  public sidebar_: RSidebar;

  public footer: Footer;

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
    this._sidebar = new LSidebar(App.element);
    this.sidebar_ = new RSidebar(App.element);
    this.footer = new Footer(App.element);
  }

  private router() {
    const echoLocation = async () => {
      const hash = window.location.hash.replace('#', '/').slice(1);

      if (this.footer) this.footer.removeElement();

      this.footer = await new Footer(App.element);

      if (this.sidebar_) this.sidebar_.removeElement();

      this.sidebar_ = new RSidebar(App.element);

      switch (hash) {
        case AppPage.home:
          App.init(AppPage.home);
          break;
        case AppPage.team:
          App.init(AppPage.team);
          break;
        case AppPage.authorization:
          App.init(AppPage.authorization);
          break;
        case AppPage.book:
          App.init(AppPage.book);
          this.footer.removeElement();
          this.sidebar_.removeElement();
          break;
        case AppPage.sprint:
          App.init(AppPage.sprint);
          break;
        default:
          App.init(AppPage.home);
      }

      if (
        hash !== AppPage.home &&
        hash !== AppPage.team &&
        hash !== AppPage.authorization &&
        hash !== AppPage.sprint &&
        hash !== AppPage.book
      ) {
        this.error = new Error(App.element);
      }

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
