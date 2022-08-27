import {getSprintWords} from '@/data/services/data.sprint-service';
import {ISprintCard} from '@/view/components/SprintCard/models/sprint-card.model';
import {SprintCard} from '@/view/components/SprintCard/sprint-card';
import {content, Template} from '@/view/Template';
import {gameSprintScreenTemplate, initialSprintTemplate} from './sprint.view';
import trueSound from './audio/true.mp3';
import falseSound from './audio/false.mp3';

interface ICard {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export class Sprint extends Template {
  private sprintContainer = new Template(this.element, 'div', 'sprint-container');

  private sprintGameInstruction = initialSprintTemplate();

  private timeleft: number = 60;

  private timer: NodeJS.Timer | null = null;

  private currentSprintCard: SprintCard | null = null;

  private currentCardNum = 0;

  private group = 0;

  private currentCardData: ISprintCard | null = null;

  private timerText: Template | null = null;

  private sprintContent: Template = new Template(this.sprintContainer?.element, 'div', 'sprint-content');

  private mainScreen: Template = new Template(this.sprintContent.element, 'div', 'main-screen');

  private gameScreen: Template = new Template(this.sprintContent.element, 'div', 'not-main-screen sprint-content_hide');

  private cardContainer: Template | null = null;

  private sprintBtnsContainer: Template | null = null;

  private sprintFalseBtnsItems: Template | null = null;

  private sprintTrueBtnsItems: Template | null = null;

  private sprintFalseBtn: Template | null = null;

  private sprintFalseArrow: Template | null = null;

  private sprintTrueBtn: Template | null = null;

  private sprintTrueArrow: Template | null = null;

  private restartGameBtn: Template | null = null;

  private gamePointsMuteTemplate: string = gameSprintScreenTemplate();

  private cards: Array<ICard> = [];

  private initialСards: Array<ICard> = [];

  private answer: boolean = true;

  private score: number = 0;

  private defaultPoints = 10;

  private queueCorrectAnswers: number = 0;

  private scoreElement: HTMLParagraphElement | null = null;

  private screenFinish: Template | null = null;

  private finalResult: Template | null = null;

  private screenFinishCloseBtn: Template | null = null;

  private screenFinishImage: Template | null = null;

  private screenFinishImgContainer: Template | null = null;

  private trueAudio = new Audio(trueSound);

  private falseAudio = new Audio(falseSound);

  private preloader: Template | null = null;

  private arrayScore: Array<number> = [];

  private trueWords: Array<ICard> = [];

  private falseWords: Array<ICard> = [];

  private guessedWordsContainer: Template | null = null;

  private notGuessedWordsContainer: Template | null = null;

  private finishWordsContainer: Template | null = null;

  private waitText: Template | null = null;

  constructor(
    public parent: HTMLElement | null,
    public tagName: keyof HTMLElementTagNameMap,
    public className?: content,
    public value?: content,
    public attr?: object,
  ) {
    super(parent, tagName, className, value, attr);

    Storage.prototype.setObject = (key: string, value: Array<number>) => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    Storage.prototype.getObject = (key: string) => {
      const value = localStorage.getItem(key);

      return value && JSON.parse(value);
    };

    if (window.localStorage.getObject('sprint-score')) {
      this.arrayScore = window.localStorage.getObject('sprint-score');
    }
  }

  public renderInitialScreen() {
    this.createInitialScreen();
    this.listenInitialScreen();
  }

  private createInitialScreen(): void {
    this.mainScreen.element.insertAdjacentHTML('beforeend', this.sprintGameInstruction);
  }

  private createGameScreen(): void {
    this.gameScreen.element.insertAdjacentHTML('beforeend', this.gamePointsMuteTemplate);
    this.scoreElement = document.querySelector('.scoring-points');
    const muteBtn: HTMLElement | null = document.querySelector('.mute-btn');

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        muteBtn.classList.toggle('active-mute-btn');
        if (muteBtn.classList.contains('active-mute-btn')) {
          this.trueAudio.volume = 0;
          this.falseAudio.volume = 0;
        } else {
          this.trueAudio.volume = 1;
          this.falseAudio.volume = 1;
        }
      });
    }
  }

  private createGameControls() {
    this.sprintBtnsContainer = new Template(this.gameScreen.element, 'div', 'sprint__btn-container');
    this.sprintFalseBtnsItems = new Template(this.sprintBtnsContainer.element, 'div', 'sprint__btn-false-items');
    this.sprintTrueBtnsItems = new Template(this.sprintBtnsContainer.element, 'div', 'sprint__btn-true-items');

    this.sprintFalseBtn = new Template(this.sprintFalseBtnsItems.element, 'button', 'sprint__false-btn', 'Неверно');
    this.sprintFalseArrow = new Template(this.sprintFalseBtnsItems.element, 'button', 'sprint__false-arrow');

    this.sprintTrueBtn = new Template(this.sprintTrueBtnsItems.element, 'button', 'sprint__true-btn', 'Верно');
    this.sprintTrueArrow = new Template(this.sprintTrueBtnsItems.element, 'button', 'sprint__true-arrow');

    this.listenControls();
  }

  private async createCards() {
    for (let i = 0; i < 13; i++) {
      this.initialСards.push(...(await getSprintWords(`page=${i}&group=${this.group - 1})`)));
    }

    this.shuffleCards();
    this.createCard();
  }

  private getRandomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffleCards() {
    const tmpArr = this.initialСards.map((a) => ({...a}));

    this.cards = [...tmpArr];

    this.cards.forEach((elem) => {
      if (this.getRandomInRange(2, 200) % 2 === 0) {
        elem.wordTranslate = this.initialСards[this.getRandomInRange(0, this.initialСards.length - 1)].wordTranslate;
      }
    });
  }

  private createCard() {
    this.currentCardData = {
      word: this.cards[this.currentCardNum].word,
      wordTranslate: this.cards[this.currentCardNum].wordTranslate,
      audio: this.cards[this.currentCardNum].audio,
    };
    this.currentSprintCard = new SprintCard(
      (this.cardContainer as Template).element,
      'div',
      this.currentCardData,
      'sprint-card',
    );
    this.currentSprintCard.init();
  }

  private listenInitialScreen() {
    const levelElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.sprint-radio-btn');

    levelElements.forEach((radioBtn) => {
      radioBtn.addEventListener('change', () => {
        this.group = +radioBtn.value;
        this.startGame();
      });
    });
  }

  private startGame() {
    this.mainScreen.element.classList.add('sprint-content_hide');
    this.gameScreen.element.classList.remove('sprint-content_hide');
    this.waitText = new Template(this.gameScreen.element, 'p', 'wait-text', 'Приготовьтесь...');
    this.preloader = new Template(this.gameScreen.element, 'div', 'load', '<hr/><hr/><hr/><hr/>');
    this.createCards();

    setTimeout(() => {
      (this.preloader as Template).element.classList.add('sprint-content_hide');
      (this.waitText as Template).element.classList.add('sprint-content_hide');
      this.timerText = new Template(this.gameScreen.element, 'p', 'timer-text');
      this.createGameScreen();
      this.cardContainer = new Template(this.gameScreen.element, 'div', 'sprint-card-container');
      this.createGameControls();
      this.createTimer();
    }, 3000);
  }

  private findInitialCard() {
    const initialCard = this.initialСards.find((elem) => elem.word === (this.currentCardData as ISprintCard).word);

    return initialCard;
  }

  private checkCard() {
    const initialCard = this.findInitialCard();

    if (this.currentCardData?.wordTranslate === initialCard?.wordTranslate) {
      this.answer ? this.changeState(true) : this.changeState(false);
    } else {
      this.answer ? this.changeState(false) : this.changeState(true);
    }
  }

  private changeState(state: boolean) {
    const initialCard = this.findInitialCard();

    if (state) {
      this.increaseScore();
      this.queueCorrectAnswers++;
      this.trueAudio.play();
      if (initialCard && this.currentCardNum < this.cards.length) {
        this.trueWords.push(initialCard);
      }

      if (this.queueCorrectAnswers % 4 === 0) {
        this.activeStar();
        this.defaultPoints += 10;
        this.inactiveDots();
      } else {
        this.activeDot();
      }
    } else {
      if (initialCard && this.currentCardNum < this.cards.length) {
        this.falseWords.push(initialCard);
      }

      this.falseAudio.play();
      this.queueCorrectAnswers = 0;
      this.inactiveDots();
      this.inactiveStars();
    }
  }

  private activeStar() {
    const starElement: HTMLSpanElement | null = document.querySelector('.star-inactive');

    (starElement as HTMLSpanElement).classList.remove('star-inactive');
  }

  private increaseScore() {
    if (this.scoreElement) {
      this.score += this.defaultPoints;
      this.scoreElement.textContent = `${this.score}`;
    }
  }

  private inactiveStars() {
    const starElements: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll('.star-active');

    starElements.forEach((elem) => {
      (elem as HTMLSpanElement).classList.add('star-inactive');
    });

    this.defaultPoints = 10;
  }

  private inactiveDots() {
    const checkDotElements: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll('.check-container__item');

    checkDotElements.forEach((elem) => {
      (elem as HTMLSpanElement).classList.remove('check-container__item_active');
    });
  }

  private activeDot() {
    const checkDotElements: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll('.check-container__item');

    for (let i = 0; i < checkDotElements.length; i++) {
      if (!checkDotElements[i].classList.contains('check-container__item_active')) {
        checkDotElements[i].classList.add('check-container__item_active');
        break;
      }
    }
  }

  private checkCountCards() {
    if (this.currentCardNum > this.cards.length) {
      this.timeleft = 0;
    }
  }

  private trueAnswer() {
    this.checkCountCards();
    this.answer = true;
    this.checkAnswer();
  }

  private falseAnswer() {
    this.checkCountCards();
    this.answer = false;
    this.checkAnswer();
  }

  private checkAnswer() {
    if (this.cardContainer) {
      this.checkCard();
      this.cardContainer.element.textContent = '';
      this.currentCardNum++;
      this.createCard();
    }
  }

  private listenControls() {
    (this.sprintFalseBtn as Template).element.addEventListener('click', this.falseAnswer.bind(this));
    (this.sprintFalseArrow as Template).element.addEventListener('click', this.falseAnswer.bind(this));

    (this.sprintTrueBtn as Template).element.addEventListener('click', this.trueAnswer.bind(this));
    (this.sprintTrueArrow as Template).element.addEventListener('click', this.trueAnswer.bind(this));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.falseAnswer();
      } else if (e.key === 'ArrowRight') {
        this.trueAnswer();
      }
    });
  }

  private createTimer() {
    if (this.gameScreen.element) {
      this.timer = setInterval(() => {
        if (this.timerText) {
          if (this.timeleft <= 0) {
            clearInterval(this.timer as NodeJS.Timer);
            this.timerText.element.textContent = 'Finish';
            this.createFinishScreen();
          } else {
            this.timerText.element.textContent = `${this.timeleft}`;
          }
        }

        this.timeleft -= 1;
      }, 1000);
    }
  }

  private showFinishWords() {
    if (this.screenFinish) {
      this.finishWordsContainer = new Template(this.screenFinish.element, 'div', 'finish-words-container');
      this.showGuessedWords();
      this.showNotGuessedWwords();
    }
  }

  private showGuessedWords(): void {
    if (this.finishWordsContainer) {
      this.guessedWordsContainer = new Template(
        this.finishWordsContainer.element,
        'div',
        'guessed-words-container',
        '<h3>Угаданные слова</h3>',
      );
      this.trueWords.forEach((elem) => {
        if (this.guessedWordsContainer) {
          new Template(this.guessedWordsContainer.element, 'p', 'guessed-word', `${elem.word} - ${elem.wordTranslate}`);
        }
      });
    }
  }

  private showNotGuessedWwords(): void {
    if (this.finishWordsContainer) {
      this.notGuessedWordsContainer = new Template(
        this.finishWordsContainer.element,
        'div',
        'not-guessed-words-container',
        '<h3>Не угаданные слова</h3>',
      );
      this.falseWords.forEach((elem) => {
        if (this.notGuessedWordsContainer) {
          new Template(
            this.notGuessedWordsContainer.element,
            'p',
            'not-guessed-word',
            `${elem.word} - ${elem.wordTranslate}`,
          );
        }
      });
    }
  }

  private createFinishScreen() {
    this.gameScreen.element.classList.add('sprint-content_hide');
    this.screenFinish = new Template(this.sprintContent.element, 'div', 'screen-finish');
    this.finalResult = new Template(this.screenFinish.element, 'p', 'final-result');

    if (this.falseWords.length !== 0 && this.trueWords.length !== 0) {
      this.showFinishWords();
    }

    if (this.scoreElement) {
      this.finalResult.element.textContent = `Ваш результат: ${this.scoreElement.textContent} баллов`;
    }

    this.screenFinishImgContainer = new Template(this.screenFinish.element, 'div', 'screen-finish-img-container');
    this.screenFinishImage = new Template(this.screenFinishImgContainer.element, 'span', 'screen-finish-image');

    if (this.score === 0) {
      this.screenFinishImage.element.classList.add('screen-finish-image_sad');
    } else {
      this.screenFinishImage.element.classList.add('screen-finish-image_smile');
    }

    this.arrayScore?.push(this.score);
    window.localStorage.setObject('sprint-score', this.arrayScore);
    this.screenFinishCloseBtn = new Template(
      this.screenFinish.element,
      'button',
      'screen-finish-close',
      'К уровням игры',
    );
    this.restartGameBtn = new Template(this.screenFinish.element, 'button', 'restart-game-btn', 'Играть ещё раз');
    this.listenFinishScreen();
  }

  private listenFinishScreen(): void {
    (this.screenFinishCloseBtn as Template).element.addEventListener('click', this.closeFinishScreen.bind(this));
    (this.restartGameBtn as Template).element.addEventListener('click', this.restartGame.bind(this));
  }

  private resetGame() {
    (this.cardContainer as Template).element.textContent = '';
    (this.gameScreen as Template).element.textContent = '';
    this.timeleft = 60;
    this.timer = null;
    this.currentSprintCard = null;
    this.currentCardNum = 0;
    this.group = 0;
    this.currentCardData = null;
    this.timerText = null;
    this.cardContainer = null;
    this.sprintBtnsContainer = null;
    this.sprintFalseBtnsItems = null;
    this.sprintTrueBtnsItems = null;
    this.sprintFalseBtn = null;
    this.sprintFalseArrow = null;
    this.sprintTrueBtn = null;
    this.sprintTrueArrow = null;
    this.gamePointsMuteTemplate = gameSprintScreenTemplate();
    this.cards = [];
    this.initialСards = [];
    this.answer = true;
    this.score = 0;
    this.defaultPoints = 10;
    this.queueCorrectAnswers = 0;
    this.scoreElement = null;
    this.screenFinish = null;
    this.finalResult = null;
    this.screenFinishCloseBtn = null;
    this.screenFinishImage = null;
    this.screenFinishImgContainer = null;
    this.trueAudio.volume = 1;
    this.falseAudio.volume = 1;
    this.trueWords = [];
    this.falseWords = [];
    const levelElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.sprint-radio-btn');

    levelElements.forEach((elem) => {
      elem.checked = false;
    });
  }

  private restartGame() {
    (this.screenFinish as Template).element.classList.add('sprint-content_hide');
    (this.cardContainer as Template).element.textContent = '';
    (this.gameScreen as Template).element.textContent = '';
    this.timeleft = 60;
    this.timer = null;
    this.currentSprintCard = null;
    this.currentCardNum = 0;
    this.currentCardData = null;
    this.timerText = null;
    this.cardContainer = null;
    this.sprintBtnsContainer = null;
    this.sprintFalseBtnsItems = null;
    this.sprintTrueBtnsItems = null;
    this.sprintFalseBtn = null;
    this.sprintFalseArrow = null;
    this.sprintTrueBtn = null;
    this.sprintTrueArrow = null;
    this.gamePointsMuteTemplate = gameSprintScreenTemplate();
    this.cards = [];
    this.initialСards = [];
    this.answer = true;
    this.score = 0;
    this.defaultPoints = 10;
    this.queueCorrectAnswers = 0;
    this.scoreElement = null;
    this.screenFinish = null;
    this.finalResult = null;
    this.screenFinishCloseBtn = null;
    this.screenFinishImage = null;
    this.screenFinishImgContainer = null;
    this.trueAudio.volume = 1;
    this.falseAudio.volume = 1;
    this.trueWords = [];
    this.falseWords = [];
    this.startGame();
  }

  private closeFinishScreen(): void {
    if (this.screenFinish) {
      this.screenFinish.element.classList.add('sprint-content_hide');
    }

    this.mainScreen.element.classList.remove('sprint-content_hide');
    this.resetGame();
  }
}
