import {getWords} from '@/data/services/data.service';
import {Card} from '@/view/components/Card';
import {content, Template} from '@/view/Template';
import {textbookTemplate} from './textbook.view';

export class Textbook extends Template {
  private countSection = 6;

  private group = 0;

  private page = 0;

  private cards: Array<Card> = [];

  private countPages = 30;

  private navigation: Template | null = null;

  private gameLinksContainer: Template | null = null;

  private sectionList: Template | null = null;

  private sectionListItem: Template | null = null;

  private audioСall: Template | null = null;

  private sprint: Template | null = null;

  private textbookContainer = textbookTemplate();

  private cardsContainer: Template | null = null;

  constructor(
    public parent: HTMLElement | null,
    public tagName: keyof HTMLElementTagNameMap,
    public className?: content,
    public value?: content,
    public attr?: object,
  ) {
    super(parent, tagName, className, value, attr);
    this.init();
  }

  public init() {
    this.createCardsContainer();
    this.createCards();
  }

  public async create() {
    new Template(this.element, 'div', 'textbook-container', this.textbookContainer);
    this.createMenu();
    this.createCardsContainer();
  }

  private createMenu() {
    this.navigation = new Template(document.querySelector('.menu'), 'nav', 'navigation');
    this.createSections();
    this.createGameSections();
  }

  private async createSections() {
    if (this.navigation?.element) {
      this.sectionList = new Template(this.navigation.element, 'ul', 'section-list');
      this.createSectionsItem();
    }
  }

  private createSectionsItem() {
    for (let i = 0; i < this.countSection; i++) {
      if (this.sectionList?.element) {
        this.sectionListItem = new Template(this.sectionList.element, 'li', 'section-list__item');
        new Template(
          this.sectionListItem.element,
          'button',
          `menu__item-btn menu__item-btn_${i + 1}`,
          `Раздел ${i + 1}`,
        );
      }
    }
  }

  private createGameSections() {
    this.gameLinksContainer = new Template(document.querySelector('.menu'), 'div', 'navigation-games');
    this.createGameItems();
  }

  private createGameItems() {
    this.audioСall = new Template(
      (this.gameLinksContainer as Template).element,
      'a',
      'game-link game-link_audioСall',
      'Аудиовызов',
    );
    this.audioСall.element.setAttribute('href', '/');

    this.sprint = new Template(
      (this.gameLinksContainer as Template).element,
      'a',
      'game-link game-link_sprint',
      'Спринт',
    );
    this.sprint.element.setAttribute('href', '/');
  }

  private createCardsContainer() {
    this.cardsContainer = new Template(document.querySelector('.textbook-container'), 'div', 'cards-container');
  }

  public async createCards() {
    const cardsData = await getWords(`page=${this.page}&group=${this.group}`);

    if (this.cardsContainer) {
      cardsData.forEach((cardData) => {
        const cardElement = new Card((this.cardsContainer as Template).element, 'div', cardData, 'learn-card');

        this.cards.push(cardElement);
        cardElement.init();
      });
      this.listen();
    }
  }

  public listen() {
    const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.play-btn');
    const btnsArr: Array<HTMLButtonElement> = [];

    btns.forEach((btn) => {
      btnsArr.push(btn);
    });

    btnsArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btnsArr.filter((elem) => elem.classList.contains('play-btn_pause')).length > 0) {
          if (btn.classList.contains('play-btn_pause')) {
            this.cards[btnsArr.indexOf(btn)].toggleAudio(false);
            btn.classList.remove('play-btn_pause');
          } else {
            this.cards.forEach((cardElem) => {
              cardElem.toggleAudio(false);
            });

            this.cards[btnsArr.indexOf(btn)].toggleAudio(true, btn);

            btns.forEach((elem) => elem.classList.remove('play-btn_pause'));
            btn.classList.add('play-btn_pause');
          }
        } else {
          this.cards[btnsArr.indexOf(btn)].toggleAudio(true, btn);
          btn.classList.add('play-btn_pause');
        }
      });
    });
  }
}
