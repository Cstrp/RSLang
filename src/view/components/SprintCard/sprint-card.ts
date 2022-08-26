import {content, Template} from '@/view/Template';
import {ISprintCard} from './models/sprint-card.model';
import {getCardSprintTemplate} from './sprint-card.view';

export class SprintCard extends Template {
  constructor(
    public parent: HTMLElement | null,
    public tagName: keyof HTMLElementTagNameMap,
    public options: ISprintCard,
    public className?: content,
    public value?: content,
    public attr?: object,
  ) {
    super(parent, tagName, className, value, attr);
  }

  public init() {
    this.create();
    this.listen();
  }

  public create() {
    this.element.insertAdjacentHTML('beforeend', getCardSprintTemplate(this.options));
  }

  public listen() {
    const audioPlayBtn: HTMLButtonElement | null = document.querySelector('.sprint-audio-play');

    if (audioPlayBtn) {
      audioPlayBtn.addEventListener('click', this.playAudio);
    }
  }

  public playAudio() {
    const audioElement: HTMLAudioElement | null = document.querySelector('.sprint-audio');

    if (audioElement) {
      audioElement.play();
    }
  }
}
