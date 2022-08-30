import {getAudioCallWords} from '@/data/services/data.audio-call';
import {content, Template} from '@/view/Template';
import {gameAudioCallScreenTemplate, initialAudioCallTemplate} from './audio-call.view';
import trueSound from './audio/true.mp3';
import falseSound from './audio/false.mp3';
import {AudioCallCard} from '@/view/components/IU/AudioCallCard/audio-call-card';
import {IAudioCallCard} from '@/view/components/IU/AudioCallCard/models';

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

export class AudioCall extends Template {
  private audioCallContainer = new Template(this.element, 'div', 'audio-call-container');

  private audioCallGameInstruction = initialAudioCallTemplate();

  private currentAudioCallCard: AudioCallCard | null = null;

  private currentCardNum = 0;

  private group = 0;

  private currentCardData: IAudioCallCard | null = null;

  private audioCallContent: Template = new Template(this.audioCallContainer?.element, 'div', 'audio-call-content');

  private mainScreen: Template = new Template(this.audioCallContent.element, 'div', 'main-screen');

  private gameScreen: Template = new Template(
    this.audioCallContent.element,
    'div',
    'not-main-screen audio-call-content_hide',
  );

  private cardContainer: Template | null = null;

  private audioCallBtnsContainer: Template | null = null;

  private restartGameBtn: Template | null = null;

  private gamePointsMuteTemplate: string = gameAudioCallScreenTemplate();

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

  private trueAudio = new Audio(trueSound);

  private falseAudio = new Audio(falseSound);

  private preloader: Template | null = null;

  private arrayScore: Array<number> = [];

  private trueWords: Array<ICard> = [];

  private falseWords: Array<ICard> = [];

  private guessedWordsContainer: Template | null = null;

  private notGuessedWordsContainer: Template | null = null;

  private finishWordsContainer: Template | null = null;

  private loadCounter: Template | null = null;

  private waitText: Template | null = null;

  private audioCallAnswerBtn: Template | null = null;

  private currentTranslateWords: Array<string> = [];

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

    if (window.localStorage.getObject('audio-call-score')) {
      this.arrayScore = window.localStorage.getObject('audio-call-score');
    }
  }

  public renderInitialScreen() {
    this.createInitialScreen();
    this.listenInitialScreen();
  }

  private createInitialScreen(): void {
    this.mainScreen.element.insertAdjacentHTML('beforeend', this.audioCallGameInstruction);
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
    this.audioCallBtnsContainer = new Template(this.gameScreen.element, 'div', 'audio-call__btn-container');
    this.audioCallAnswerBtn = new Template(
      this.audioCallBtnsContainer.element,
      'button',
      'audio-call__forward',
      '&xrArr;',
    );

    this.listenControls();
  }

  private async createCards() {
    for (let i = 0; i < 13; i++) {
      this.initialСards.push(...(await getAudioCallWords(`page=${i}&group=${this.group - 1})`)));
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
  }

  // private getTranslationRandomWords() {}

  private createCard() {
    this.currentCardData = {
      word: this.cards[this.currentCardNum].word,
      image: this.cards[this.currentCardNum].image,
      wordTranslate: this.cards[this.currentCardNum].wordTranslate,
      audio: this.cards[this.currentCardNum].audio,
    };
    this.currentAudioCallCard = new AudioCallCard(
      (this.cardContainer as Template).element,
      'div',
      this.currentCardData,
      'audio-call-card',
    );

    this.currentAudioCallCard.init();
  }

  private listenInitialScreen() {
    const levelElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.audio-call-radio-btn');

    levelElements.forEach((radioBtn) => {
      radioBtn.addEventListener('change', () => {
        this.group = +radioBtn.value;
        this.startGame();
      });
    });
  }

  private startGame() {
    this.mainScreen.element.classList.add('audio-call-content_hide');
    this.gameScreen.element.classList.remove('audio-call-content_hide');
    this.loadCounter = new Template(this.gameScreen.element, 'p', 'load-counter');
    this.waitText = new Template(this.gameScreen.element, 'p', 'wait-text', 'Приготовьтесь...');
    this.preloader = new Template(this.gameScreen.element, 'div', 'load', '<hr/><hr/><hr/><hr/>');

    this.createCards();

    setTimeout(() => {
      (this.preloader as Template).element.classList.add('audio-call-content_hide');
      (this.waitText as Template).element.classList.add('audio-call-content_hide');
      (this.loadCounter as Template).element.classList.add('audio-call-content_hide');
      this.createGameScreen();
      this.cardContainer = new Template(this.gameScreen.element, 'div', 'audio-call-card-container');
      this.createGameControls();
    }, 4000);
  }

  private findInitialCard() {
    const initialCard = this.initialСards.find((elem) => elem.word === (this.currentCardData as IAudioCallCard).word);

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
    } else {
      if (initialCard && this.currentCardNum < this.cards.length) {
        this.falseWords.push(initialCard);
      }

      this.falseAudio.play();
      this.queueCorrectAnswers = 0;
    }
  }

  private increaseScore() {
    if (this.scoreElement) {
      this.score += this.defaultPoints;
      this.scoreElement.textContent = `${this.score}`;
    }
  }

  private checkCountCards() {
    if (this.currentCardNum >= this.cards.length - 1) {
      console.log('todo check');
    }
  }

  private gameAnswer() {
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
    this.audioCallAnswerBtn?.element.addEventListener('click', this.gameAnswer.bind(this));
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
    this.gameScreen.element.classList.add('audio-call-content_hide');
    this.screenFinish = new Template(this.audioCallContent.element, 'div', 'screen-finish');
    this.finalResult = new Template(this.screenFinish.element, 'p', 'final-result');

    if (this.falseWords.length !== 0 && this.trueWords.length !== 0) {
      this.showFinishWords();
    }

    if (this.scoreElement) {
      this.finalResult.element.textContent = `Ваш результат: ${this.scoreElement.textContent} баллов`;
    }

    this.arrayScore?.push(this.score);
    window.localStorage.setObject('audio-call-score', this.arrayScore);
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
    this.currentAudioCallCard = null;
    this.currentCardNum = 0;
    this.group = 0;
    this.currentCardData = null;
    this.cardContainer = null;
    this.audioCallBtnsContainer = null;
    this.audioCallAnswerBtn = null;
    this.gamePointsMuteTemplate = gameAudioCallScreenTemplate();
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
    this.trueAudio.volume = 1;
    this.falseAudio.volume = 1;
    this.trueWords = [];
    this.falseWords = [];
    const levelElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.audio-call-radio-btn');

    levelElements.forEach((elem) => {
      elem.checked = false;
    });
  }

  private restartGame() {
    (this.screenFinish as Template).element.classList.add('audio-call-content_hide');
    (this.cardContainer as Template).element.textContent = '';
    (this.gameScreen as Template).element.textContent = '';
    this.currentAudioCallCard = null;
    this.currentCardNum = 0;
    this.currentCardData = null;
    this.cardContainer = null;
    this.audioCallBtnsContainer = null;
    this.audioCallAnswerBtn = null;
    this.gamePointsMuteTemplate = gameAudioCallScreenTemplate();
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
    this.trueAudio.volume = 1;
    this.falseAudio.volume = 1;
    this.trueWords = [];
    this.falseWords = [];
    this.startGame();
  }

  private closeFinishScreen(): void {
    if (this.screenFinish) {
      this.screenFinish.element.classList.add('audio-call-content_hide');
    }

    this.mainScreen.element.classList.remove('audio-call-content_hide');
    this.resetGame();
  }
}
