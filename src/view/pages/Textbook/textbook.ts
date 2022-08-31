import {getWords} from '@/data/services/data.service';
import {get, remove, set} from '@/data/utils/_storage';
import {Card} from '@/view/components/Card';
import {Template} from '@/view/Template';
import {textbookTemplate} from './textbook.view';

export class Textbook extends Template {
  private countSection = 6;

  private group = 0;

  private page = 0;

  private pageDifficultWords = 0;

  private maxPageDifficultWords = 0;

  private cards: Array<Card> = [];

  private difficultWords: Array<Array<Card>> = [[]];

  private readonly studiedWords: Array<Card> = [];

  private buttonsPlaySound: NodeListOf<HTMLButtonElement> | null = null;

  private countPages = 29;

  private countCards = 20;

  private minPage = 0;

  private navigation: Template | null = null;

  private gameLinksContainer: Template | null = null;

  private sectionList: Template | null = null;

  private sectionListItem: Template | null = null;

  private menu: Template | null = null;

  private textbookContainer = textbookTemplate();

  private cardsContainer: Template | null = null;

  private paginationContainer: Template | null = null;

  private paginationLeftBtn: Template | null = null;

  private paginationText: Template | null = null;

  private paginationPageNumber: Template | null = null;

  private paginationRightBtn: Template | null = null;

  private lengthDifficultWords: number = 0;

  private lengthStudiedWords: number = 0;

  constructor(parent: HTMLElement) {
    super(parent, 'main', 'main');

    Storage.prototype.setObject = (key: string, value: Array<Array<Card>> | Array<Card>) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.getObject = (key: string) => {
      const value = localStorage.getItem(key);

      return value && JSON.parse(value);
    };

    if (window.localStorage.getObject('studied-words')) {
      this.studiedWords = window.localStorage.getObject('studied-words');
    }

    if (get('texbook-group') && get('texbook-page')) {
      this.group = +get('texbook-group');
      this.page = +get('texbook-page');
    }

    this.menu = new Template(this.element, 'div', 'menu');

    this.create();
  }

  private async addToLocalStorage() {
    set('texbook-group', `${this.group}`);
    set('texbook-page', `${this.page}`);
  }

  public async create() {
    new Template(this.element, 'div', 'textbook-container', this.textbookContainer);
    await this.createMenu();

    if (window.localStorage.getObject('difficult-words')) {
      this.difficultWords = window.localStorage.getObject('difficult-words');
      (document.querySelector('.texbook-btn-difficult-word') as HTMLButtonElement).style.display = 'flex';
    }

    this.createCardsContainer();
    this.listen();

    if (get('group-difficult-words')) {
      this.pageDifficultWords = +get('group-difficult-words');
      (document.querySelector('.cards-container') as HTMLDivElement).textContent = '';
      this.showDifficultWords();
    } else {
      await this.createCards();
      this.createPagination();
      this.listen();
    }
  }

  private async createMenu() {
    this.navigation = new Template(this.menu?.element as HTMLElement, 'nav', 'navigation');
    await this.createSections();
    this.createGameSections();
  }

  private createPagination() {
    this.paginationContainer = new Template(
      <HTMLElement>document.querySelector('.textbook-container'),
      'div',
      'pagination-texbook',
    );
    this.paginationLeftBtn = new Template(
      this.paginationContainer.element,
      'button',
      'pagination-btn pagination-btn_left',
    );
    this.paginationText = new Template(this.paginationContainer.element, 'p', 'pagination-text', 'Страница: ');
    this.paginationPageNumber = new Template(this.paginationText.element, 'span', 'page-number', '1');
    this.paginationRightBtn = new Template(
      this.paginationContainer.element,
      'button',
      'pagination-btn pagination-btn_right',
    );
    if (get('texbook-page')) {
      this.page = +get('texbook-page');

      if (this.paginationPageNumber) {
        this.paginationPageNumber.element.textContent = `${this.page + 1}`;
      }
    }
  }

  private async createSections() {
    if (this.navigation) {
      this.sectionList = new Template(this.navigation.element, 'ul', 'section-list');
      await this.createSectionsItem();
    }
  }

  private createSectionsItem() {
    for (let i = 0; i < this.countSection; i++) {
      if (this.sectionList) {
        this.sectionListItem = new Template(this.sectionList.element, 'li', 'section-list__item');
        new Template(
          this.sectionListItem.element,
          'button',
          `menu__item-btn menu__item-btn_${i + 1}`,
          `Раздел ${i + 1}`,
        );
      }
    }

    if (this.sectionList) {
      this.sectionListItem = new Template(this.sectionList.element, 'li', 'section-list__item');
      new Template(this.sectionListItem.element, 'button', 'texbook-btn-difficult-word', 'Сложные слова');
    }
  }

  private createGameSections() {
    this.gameLinksContainer = new Template(<HTMLElement>document.querySelector('.menu'), 'div', 'navigation-games');
  }

  private createCardsContainer() {
    this.cardsContainer = new Template(
      <HTMLElement>document.querySelector('.textbook-container'),
      'div',
      'cards-container',
    );
  }

  public async createCards() {
    const cardsData = await getWords(`page=${this.page}&group=${this.group}`);

    if (this.cardsContainer) {
      const cardsContainer: HTMLDivElement | null = document.querySelector('.cards-container');

      (cardsContainer as HTMLDivElement).textContent = '';
      cardsData.forEach((cardData, i) => {
        const cardElement = new Card((this.cardsContainer as Template).element, 'div', cardData, 'learn-card');

        this.cards.push(cardElement);
        cardElement.init();

        const difficultWordsBtns = document.querySelectorAll('.add-difficult-words');

        this.difficultWords.forEach((arr) => {
          arr.forEach((elem) => {
            if (elem.options.word === this.cards[i].options.word) {
              difficultWordsBtns[i].textContent = 'Добавлено в сложные слова';
              difficultWordsBtns[i].classList.add('button-difficult-word-added');
              this.lengthDifficultWords++;
            }
          });
        });

        const studiedWordsBtns = document.querySelectorAll('.mark-studied');

        this.studiedWords.forEach((elem) => {
          if (elem.options.word === this.cards[i].options.word) {
            studiedWordsBtns[i].textContent = 'Изученное слово';
            studiedWordsBtns[i].classList.add('button-studied-word-added');
            this.lengthStudiedWords++;
          }
        });

        this.buttonsPlaySound = document.querySelectorAll('.play-btn');
        this.paintText();
      });

      this.disablePage();

      this.listenPlaySoundBtns();
      this.listenDifficultWordsBtns();
      this.listenStudiedWordsBtns();

      const containerBtns: NodeListOf<HTMLDivElement> = document.querySelectorAll('.btn-container-authorized');

      if (!get('userName')) {
        containerBtns.forEach((btn) => {
          btn.style.display = 'none';
        });
      }
    }
  }

  private listenStudiedWordsBtns() {
    const studiedWordsBtns = document.querySelectorAll('.mark-studied');

    studiedWordsBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        let flag = true;

        this.studiedWords.forEach((elem) => {
          if (elem.options.word === this.cards[i].options.word) {
            flag = false;
          }
        });
        if (flag) {
          this.studiedWords.push(this.cards[i]);
          window.localStorage.setObject('studied-words', this.studiedWords);
          btn.textContent = 'Изученное слово';
          btn.classList.add('button-studied-word-added');

          this.difficultWords.forEach((arr, pageIndex) => {
            arr.forEach((elem, elemIndex) => {
              if (elem.options.word === this.cards[i].options.word) {
                this.lengthDifficultWords--;
                this.difficultWords[pageIndex].splice(elemIndex, 1);
                const difficultWordsBtns = document.querySelectorAll('.add-difficult-words');

                difficultWordsBtns[i].textContent = 'Добавить в сложные слова';
                difficultWordsBtns[i].classList.remove('button-difficult-word-added');
                window.localStorage.setObject('difficult-words', this.difficultWords);
              }
            });
          });

          this.studiedWords.forEach((elem) => {
            if (elem.options.word === this.cards[i].options.word) {
              this.lengthStudiedWords++;

              this.difficultWords.forEach((arr) => {
                arr.forEach((value) => {
                  if (elem.options.word === value.options.word) {
                    this.lengthStudiedWords--;
                  }
                });
              });
            }
          });

          this.disablePage();
        }
      });
    });
  }

  private disablePage() {
    if (this.lengthStudiedWords === this.countCards) {
      const markColor = 'rgb(74 74 74)';

      this.paintText(markColor);
    }

    if (this.lengthDifficultWords + this.lengthStudiedWords >= this.countCards) {
      const markColor = 'rgb(74 74 74)';

      this.paintText(markColor);
    }
  }

  private paintText(markColor?: string) {
    const bElements: NodeListOf<HTMLElement> = document.querySelectorAll('b');
    const iElements: NodeListOf<HTMLElement> = document.querySelectorAll('i');
    const wordElements: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.word');

    if (markColor) {
      bElements.forEach((el) => {
        el.style.color = markColor;
      });

      iElements.forEach((el) => {
        el.style.color = markColor;
      });

      wordElements.forEach((el) => {
        el.style.color = markColor;
      });
    } else {
      let colorText: string = '';

      switch (this.group) {
        case 1:
          colorText = 'rgb(255 51 110)';
          break;
        case 2:
          colorText = 'rgb(0 216 255)';
          break;
        case 3:
          colorText = 'rgb(103 255 0)';
          break;
        case 4:
          colorText = 'rgb(255 1 0)';
          break;
        case 5:
          colorText = '#ffe000';
          break;
        default:
          colorText = '#ffac24';
          break;
      }

      bElements.forEach((el) => {
        el.style.color = colorText;
      });

      iElements.forEach((el) => {
        el.style.color = colorText;
      });

      wordElements.forEach((el) => {
        el.style.color = colorText;
      });
    }
  }

  public rerenderCards() {
    this.cards.forEach((cardElem) => {
      cardElem.toggleAudio(false);
    });

    this.cards = [];

    const {cardsContainer} = this;

    this.lengthDifficultWords = 0;
    this.lengthStudiedWords = 0;

    if (cardsContainer) {
      this.createCards();
    }
  }

  private toPrevPage() {
    if (this.page !== this.minPage) {
      this.page--;
      this.rerenderCards();
    }

    if (this.paginationPageNumber) {
      this.paginationPageNumber.element.textContent = `${this.page + 1}`;
    }

    if (this.page === this.minPage) {
      (this.paginationLeftBtn as Template).element.classList.add('pagination-btn-disable');
    } else {
      (this.paginationLeftBtn as Template).element.classList.remove('pagination-btn-disable');
    }

    if (this.page === this.countPages) {
      (this.paginationRightBtn as Template).element.classList.add('pagination-btn-disable');
    } else {
      (this.paginationRightBtn as Template).element.classList.remove('pagination-btn-disable');
    }

    this.addToLocalStorage();
  }

  private toNextPage() {
    if (this.page !== this.countPages) {
      this.page++;
      this.rerenderCards();
    }

    if (this.paginationPageNumber) {
      this.paginationPageNumber.element.textContent = `${this.page + 1}`;
    }

    if (this.page === this.minPage) {
      (this.paginationLeftBtn as Template).element.classList.add('pagination-btn-disable');
    } else {
      (this.paginationLeftBtn as Template).element.classList.remove('pagination-btn-disable');
    }

    if (this.page === this.countPages) {
      (this.paginationRightBtn as Template).element.classList.add('pagination-btn-disable');
    } else {
      (this.paginationRightBtn as Template).element.classList.remove('pagination-btn-disable');
    }

    this.addToLocalStorage();
  }

  private changeSection(num: number) {
    const cardsContainer: HTMLDivElement | null = document.querySelector('.cards-container');

    (cardsContainer as HTMLDivElement).textContent = '';

    if (document.querySelector('.pagination-texbook')) {
      (document.querySelector('.pagination-texbook') as HTMLDivElement).style.display = 'flex';
    } else {
      this.createPagination();
      this.listen();
    }

    this.group = num;
    this.page = 0;

    if (this.paginationPageNumber) {
      this.paginationPageNumber.element.textContent = `${this.page + 1}`;
    }

    this.rerenderCards();
    this.addToLocalStorage();
    remove('group-difficult-words');
    this.disablePage();
  }

  public listen() {
    if (this.paginationLeftBtn && this.paginationRightBtn) {
      this.paginationLeftBtn.element.addEventListener('click', this.toPrevPage.bind(this));
      this.paginationRightBtn.element.addEventListener('click', this.toNextPage.bind(this));
    }

    const menuBtns = document.querySelectorAll('.menu__item-btn');

    menuBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.changeSection(i);
      });
    });

    const btnDifficultWord = document.querySelectorAll('.texbook-btn-difficult-word');

    btnDifficultWord.forEach((btn) => {
      btn.addEventListener('click', this.showDifficultWords.bind(this));
    });
  }

  private listenPlaySoundBtns() {
    const btnsArr: Array<HTMLButtonElement> = [];

    if (this.buttonsPlaySound) {
      this.buttonsPlaySound.forEach((btn) => {
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

              if (this.buttonsPlaySound) {
                this.buttonsPlaySound.forEach((elem) => elem.classList.remove('play-btn_pause'));
              }

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

  private listenDifficultPlaySoundBtns() {
    const btnsArr: Array<HTMLButtonElement> = [];

    if (this.buttonsPlaySound) {
      this.buttonsPlaySound.forEach((btn) => {
        btnsArr.push(btn);
      });

      btnsArr.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btnsArr.filter((elem) => elem.classList.contains('play-btn_pause')).length > 0) {
            if (btn.classList.contains('play-btn_pause')) {
              this.difficultWords[this.pageDifficultWords][btnsArr.indexOf(btn)].toggleAudio(false);
              btn.classList.remove('play-btn_pause');
            } else {
              this.difficultWords[this.pageDifficultWords].forEach((cardElem) => {
                cardElem.toggleAudio(false);
              });

              this.difficultWords[this.pageDifficultWords][btnsArr.indexOf(btn)].toggleAudio(true, btn);

              if (this.buttonsPlaySound) {
                this.buttonsPlaySound.forEach((elem) => elem.classList.remove('play-btn_pause'));
              }

              btn.classList.add('play-btn_pause');
            }
          } else {
            this.difficultWords[this.pageDifficultWords][btnsArr.indexOf(btn)].toggleAudio(true, btn);
            btn.classList.add('play-btn_pause');
          }
        });
      });
    }
  }

  private showDifficultWords() {
    this.cards.forEach((cardElem) => {
      cardElem.toggleAudio(false);
    });

    this.createDifficultWords();
    this.buttonsPlaySound = document.querySelectorAll('.play-btn');
    this.listenDifficultPlaySoundBtns();
    this.listenDeleteDifficultWord();
    this.createPaginationDifficultWords();
    set('group-difficult-words', `${this.pageDifficultWords}`);
  }

  private createPaginationDifficultWords() {
    const cardsContainer: HTMLDivElement | null = document.querySelector('.cards-container');

    if (document.querySelector('.pagination-texbook')) {
      (document.querySelector('.pagination-texbook') as HTMLDivElement).style.display = 'none';
    }

    (cardsContainer as HTMLDivElement).insertAdjacentHTML(
      'beforeend',
      `<div class="pagination-difficult-words">
          <button class="pagination-difficult-words-btn pagination-difficult-words-btn_left"></button>
          <p class="pagination-difficult-words-text">Страница:
              <span class="pagination-difficult-words-page-number">1</span>
          </p>
          <button class="pagination-difficult-words-btn pagination-difficult-words-btn_right"></button>
      </div>`,
    );

    this.listenPaginationDifficultWords();
    (document.querySelector('.pagination-difficult-words-page-number') as HTMLSpanElement).textContent = `${
      this.pageDifficultWords + 1
    }`;
  }

  private createDifficultWords() {
    const cardsContainer: HTMLDivElement | null = document.querySelector('.cards-container');

    if (cardsContainer) {
      cardsContainer.textContent = '';

      this.difficultWords[this.pageDifficultWords].forEach((word) => {
        const cardElement = new Card((this.cardsContainer as Template).element, 'div', word.options, 'learn-card');

        cardElement.init();
        cardElement.element.removeChild(document.querySelector('.btn-container-authorized') as HTMLDivElement);

        cardElement.element.insertAdjacentHTML(
          'beforeend',
          '<button class="delete-difficult-words-btn">Удалить из сложных слов</button>',
        );
      });
    }
  }

  private listenDeleteDifficultWord() {
    const btnsDeleteDifficultWord = document.querySelectorAll('.delete-difficult-words-btn');

    btnsDeleteDifficultWord.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.difficultWords[this.pageDifficultWords].splice(i, 1);
        window.localStorage.setObject('difficult-words', this.difficultWords);
        this.showDifficultWords();
        if (this.difficultWords[this.pageDifficultWords].length === 0 && this.pageDifficultWords > 0) {
          this.difficultWords[this.pageDifficultWords].forEach((cardElem) => {
            cardElem.toggleAudio(false);
          });

          this.pageDifficultWords--;
          this.showDifficultWords();
          this.checkDifficultWordsPageBtns();
        }
      });
    });
  }

  private listenPaginationDifficultWords() {
    const difficultWordsPrevPage: HTMLButtonElement | null = document.querySelector(
      '.pagination-difficult-words-btn_left',
    );

    const difficultWordsNextPage: HTMLButtonElement | null = document.querySelector(
      '.pagination-difficult-words-btn_right',
    );

    if (difficultWordsPrevPage) {
      difficultWordsPrevPage.addEventListener('click', () => {
        if (this.pageDifficultWords !== this.minPage) {
          this.difficultWords[this.pageDifficultWords].forEach((cardElem) => {
            cardElem.toggleAudio(false);
          });

          this.pageDifficultWords--;
          this.showDifficultWords();
          this.checkDifficultWordsPageBtns();
        }
      });
    }

    if (difficultWordsNextPage) {
      difficultWordsNextPage.addEventListener('click', () => {
        if (this.pageDifficultWords !== this.maxPageDifficultWords) {
          this.difficultWords[this.pageDifficultWords].forEach((cardElem) => {
            cardElem.toggleAudio(false);
          });

          this.pageDifficultWords++;
          this.showDifficultWords();
          this.checkDifficultWordsPageBtns();
        }
      });
    }
  }

  private checkDifficultWordsPageBtns() {
    const difficultWordsPrevPage: HTMLButtonElement | null = document.querySelector(
      '.pagination-difficult-words-btn_left',
    );

    const difficultWordsNextPage: HTMLButtonElement | null = document.querySelector(
      '.pagination-difficult-words-btn_right',
    );

    if (difficultWordsPrevPage && difficultWordsNextPage) {
      if (this.pageDifficultWords === this.minPage) {
        difficultWordsPrevPage.classList.add('pagination-btn-disable');
      } else {
        difficultWordsPrevPage.classList.remove('pagination-btn-disable');
      }

      if (this.pageDifficultWords === this.maxPageDifficultWords) {
        difficultWordsNextPage.classList.add('pagination-btn-disable');
      } else {
        difficultWordsNextPage.classList.remove('pagination-btn-disable');
      }
    }
  }

  private listenDifficultWordsBtns() {
    const difficultWordsBtns = document.querySelectorAll('.add-difficult-words');

    difficultWordsBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        let flag = true;

        (document.querySelector('.texbook-btn-difficult-word') as HTMLButtonElement).style.display = 'flex';

        this.difficultWords.forEach((arr) => {
          arr.forEach((elem) => {
            if (elem.options.word === this.cards[i].options.word) {
              flag = false;
            }
          });
        });

        if (flag) {
          if (this.difficultWords[this.difficultWords.length - 1].length !== 20) {
            this.difficultWords[this.difficultWords.length - 1].push(this.cards[i]);
          } else {
            this.difficultWords.push([this.cards[i]]);
            this.maxPageDifficultWords++;
          }

          window.localStorage.setObject('difficult-words', this.difficultWords);
          btn.textContent = 'Добавлено в сложные слова';
          btn.classList.add('button-difficult-word-added');

          this.difficultWords.forEach((arr) => {
            arr.forEach((elem) => {
              if (elem.options.word === this.cards[i].options.word) {
                this.lengthDifficultWords++;

                this.studiedWords.forEach((value) => {
                  if (elem.options.word === value.options.word) {
                    this.lengthDifficultWords--;
                  }
                });
              }
            });
          });

          this.disablePage();
        }
      });
    });
  }
}
