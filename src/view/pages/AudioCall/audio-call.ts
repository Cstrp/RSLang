import {getAudioCallWords} from '@/data/services/data.audio-call';
import {Template} from '@/view/Template';
import {gameAudioCallScreenTemplate, initialAudioCallTemplate} from './audio-call.view';
import trueSound from './audio/true.mp3';
import falseSound from './audio/false.mp3';
import {AudioCallCard} from '@/view/components/IU/AudioCallCard/audio-call-card';
import {IAudioCallCard} from '@/view/components/IU/AudioCallCard/models';
import {IGame, IStatistics} from '@/data/interfaces/IStatistics';
import {getGameStatistics, getStatistics} from '@/data/api/statistics';
import {get} from '@/data/utils/_storage';

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

  private score: number = 0;

  private defaultPoints = 10;

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

  private answerNum: number | null = null;

  private correctAnswer: number = 0;

  constructor(parent: HTMLElement) {
    super(parent, 'main', '123');

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

    const audioResult: IStatistics = {
      totalCountOfWords: 0,
      game: IGame.audioCall,
      newWordsOfDay: 3,
      rightWords: 1,
      wrongWords: 1,
    };

    getStatistics(get('userID'))
      .then((res) => {
        getGameStatistics(
          {
            optional: {
              ...res.optional,
              [new Date().toISOString()]: audioResult,
            },
          },
          get('userID'),
        );
      })
      .catch(() => {
        getGameStatistics(
          {
            optional: {[new Date().toISOString()]: audioResult},
          },
          get('userID'),
        );
      });

    this.renderInitialScreen();
  }

  public renderInitialScreen(): void {
    this.createInitialScreen();
    this.listenInitialScreen();
  }

  private createInitialScreen(): void {
    this.mainScreen.element.insertAdjacentHTML('beforeend', this.audioCallGameInstruction);
  }

  private createGameScreen(): void {
    this.gameScreen.element.insertAdjacentHTML('beforeend', this.gamePointsMuteTemplate);
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

  private createGameControls(): void {
    this.audioCallBtnsContainer = new Template(this.gameScreen.element, 'div', 'audio-call__btn-container');
    this.audioCallAnswerBtn = new Template(
      this.audioCallBtnsContainer.element,
      'button',
      'audio-call__forward',
      'Не знаю',
    );

    this.listenControls();
  }

  private getRandomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private async createCards(): Promise<void> {
    const cardsPage: number = this.getRandomInRange(0, 29);

    this.initialСards.push(...(await getAudioCallWords(`page=${cardsPage}&group=${this.group - 1})`)));

    const tmpArr: ICard[] = this.initialСards.map((a) => ({...a}));

    this.cards = [...tmpArr];
    this.createCard();
  }

  private getTranslationRandomWords(): void {
    this.currentTranslateWords = [];

    if (this.currentCardData) {
      const randomIndexCurrentTranslate: number = this.getRandomInRange(0, 4);

      while (this.currentTranslateWords.length < 5) {
        const randomIndex: number = this.getRandomInRange(0, 19);
        const randomTranslateWord: string = this.cards[randomIndex].wordTranslate;

        if (randomTranslateWord !== this.currentCardData.wordTranslate) {
          this.currentTranslateWords.push(randomTranslateWord);
        }
      }

      this.correctAnswer = randomIndexCurrentTranslate;
      this.currentTranslateWords[this.correctAnswer] = this.currentCardData.wordTranslate;
    }
  }

  private createCard(): void {
    this.currentCardData = {
      word: this.cards[this.currentCardNum].word,
      image: this.cards[this.currentCardNum].image,
      wordTranslate: this.cards[this.currentCardNum].wordTranslate,
      audio: this.cards[this.currentCardNum].audio,
    };

    this.getTranslationRandomWords();

    this.currentAudioCallCard = new AudioCallCard(
      (this.cardContainer as Template).element,
      'div',
      this.currentCardData,
      this.currentTranslateWords,
      'audio-call-card',
    );

    this.currentAudioCallCard.init();
    this.listenTranslateWords();
  }

  private listenTranslateWords(): void {
    const translateWordsElements: NodeListOf<HTMLElement> = document.querySelectorAll('.audio-call__translate-item');

    translateWordsElements.forEach((elem, i) => {
      elem.addEventListener('click', () => {
        this.answerNum = i;
        this.checkAnswer();
      });
    });
  }

  private listenInitialScreen(): void {
    const levelElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.audio-call-radio-btn');

    levelElements.forEach((radioBtn) => {
      radioBtn.addEventListener('change', () => {
        this.group = +radioBtn.value;
        this.startGame();
      });
    });
  }

  private startGame(): void {
    this.mainScreen.element.classList.add('audio-call-content_hide');
    this.gameScreen.element.classList.remove('audio-call-content_hide');
    this.loadCounter = new Template(this.gameScreen.element, 'p', 'load-counter');
    this.waitText = new Template(this.gameScreen.element, 'p', 'wait-text', 'Приготовьтесь...');
    this.preloader = new Template(this.gameScreen.element, 'div', 'load');
    this.preloader.element.insertAdjacentHTML('beforeend', '<hr/><hr/><hr/><hr/>');

    setTimeout(() => {
      (this.preloader as Template).element.classList.add('audio-call-content_hide');
      (this.waitText as Template).element.classList.add('audio-call-content_hide');
      (this.loadCounter as Template).element.classList.add('audio-call-content_hide');
      this.createGameScreen();
      this.cardContainer = new Template(this.gameScreen.element, 'div', 'audio-call-card-container');
      this.createCards();
      this.createGameControls();
    }, 4000);
  }

  private findInitialCard(): ICard | undefined {
    const initialCard: ICard | undefined = this.initialСards.find(
      (elem) => elem.word === (this.currentCardData as IAudioCallCard).word,
    );

    return initialCard;
  }

  private checkCard(): void {
    if (this.answerNum !== undefined && this.answerNum !== null) {
      if (this.currentCardData?.wordTranslate === this.currentTranslateWords[this.answerNum]) {
        this.changeState(true);
      } else {
        this.changeState(false);
      }
    }
  }

  private changeState(state: boolean): void {
    if (state) {
      this.trueAnswer();
    } else {
      this.falseAnswer();
    }

    if (this.audioCallAnswerBtn) {
      this.audioCallAnswerBtn.element.innerHTML = '&xrArr;';
    }
  }

  private trueAnswer(): void {
    const translateWordsElements: NodeListOf<HTMLElement> = document.querySelectorAll('.audio-call__translate-item');
    const initialCard: ICard | undefined = this.findInitialCard();

    this.increaseScore();
    this.trueAudio.play();
    if (this.answerNum !== undefined && this.answerNum !== null) {
      translateWordsElements[this.answerNum].classList.add('audio-call__translate-item_active');
    }

    if (initialCard && this.currentCardNum < this.cards.length) {
      this.trueWords.push(initialCard);
    }
  }

  private falseAnswer(): void {
    const translateWordsElements: NodeListOf<HTMLElement> = document.querySelectorAll('.audio-call__translate-item');
    const initialCard: ICard | undefined = this.findInitialCard();

    if (initialCard && this.currentCardNum < this.cards.length) {
      this.falseWords.push(initialCard);
    }

    translateWordsElements[this.correctAnswer].classList.add('audio-call__translate-item_active');
    if (this.answerNum !== undefined && this.answerNum !== null) {
      translateWordsElements[this.answerNum].classList.add('audio-call__translate-item_inactive');
    }

    this.falseAudio.play();
  }

  private increaseScore(): void {
    this.score += this.defaultPoints;
  }

  private checkAnswer(): void {
    if (this.cardContainer) {
      this.checkCard();
    }
  }

  private wordPass(): void {
    const translateWordsElements: NodeListOf<HTMLElement> = document.querySelectorAll('.audio-call__translate-item');
    const initialCard: ICard | undefined = this.findInitialCard();

    if (initialCard && this.currentCardNum < this.cards.length) {
      this.falseWords.push(initialCard);
    }

    translateWordsElements[this.correctAnswer].classList.add('audio-call__translate-item_active');
    this.falseAudio.play();
  }

  private listenControls(): void {
    if (this.audioCallAnswerBtn) {
      this.audioCallAnswerBtn.element.addEventListener('click', () => {
        if (this.audioCallAnswerBtn?.element.innerHTML === 'Не знаю') {
          this.wordPass();
          if (this.audioCallAnswerBtn) {
            this.audioCallAnswerBtn.element.innerHTML = '&xrArr;';
          }
        } else {
          this.nextWord();
        }
      });
    }

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Enter' && this.audioCallAnswerBtn?.element.textContent === 'Не знаю') {
        e.preventDefault();
        this.wordPass();
        if (this.audioCallAnswerBtn) {
          this.audioCallAnswerBtn.element.innerHTML = '&xrArr;';
        }
      } else if (e.code === 'Digit1') {
        this.answerNum = 0;
      } else if (e.code === 'Digit2') {
        this.answerNum = 1;
      } else if (e.code === 'Digit3') {
        this.answerNum = 2;
      } else if (e.code === 'Digit4') {
        this.answerNum = 3;
      } else if (e.code === 'Digit5') {
        this.answerNum = 4;
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
      }

      this.checkAnswer();
    });
  }

  private nextWord(): void {
    if (this.currentCardNum >= this.cards.length - 1) {
      this.createFinishScreen();
    } else {
      (this.cardContainer as Template).element.textContent = '';
      this.currentCardNum++;
      this.createCard();
      (this.audioCallAnswerBtn as Template).element.innerHTML = 'Не знаю';
    }
  }

  private showFinishWords(): void {
    if (this.screenFinish) {
      this.finishWordsContainer = new Template(this.screenFinish.element, 'div', 'finish-words-container');
      this.showGuessedWords();
      this.showNotGuessedWwords();
    }
  }

  private showGuessedWords(): void {
    if (this.finishWordsContainer) {
      this.guessedWordsContainer = new Template(this.finishWordsContainer.element, 'div', 'guessed-words-container');
      this.guessedWordsContainer.element.insertAdjacentHTML('beforeend', '<h3>Угаданные слова</h3>');
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
      );
      this.notGuessedWordsContainer.element.insertAdjacentHTML('beforeend', '<h3>Не угаданные слова</h3>');
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

  private createFinishScreen(): void {
    this.gameScreen.element.classList.add('audio-call-content_hide');
    this.screenFinish = new Template(this.audioCallContent.element, 'div', 'screen-finish');
    this.finalResult = new Template(this.screenFinish.element, 'p', 'final-result');

    if (this.falseWords.length !== 0 || this.trueWords.length !== 0) {
      this.showFinishWords();
    }

    this.finalResult.element.textContent = `Ваш результат: ${this.score} баллов`;

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

  private resetGame(): void {
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
    this.score = 0;
    this.defaultPoints = 10;
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

  private restartGame(): void {
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
    this.score = 0;
    this.defaultPoints = 10;
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
