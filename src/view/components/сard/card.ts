import {Template} from '@/view/Template';
import {getCardTemplate} from './card.view';
import {ICard} from './models/card.model';
import {content} from '@/data/types';

export class Card extends Template {
  public audios: Array<HTMLAudioElement> | null = null;

  constructor(
    public parent: HTMLElement | null,
    public tagName: keyof HTMLElementTagNameMap,
    public options: ICard,
    public className?: content,
    public value?: content,
    public attr?: Record<string, unknown>,
  ) {
    super(<HTMLElement>parent, tagName, <string>className, value, attr);
    this.audios = [
      new Audio(`https://rslang-bc.herokuapp.com/${this.options.audio}`),
      new Audio(`https://rslang-bc.herokuapp.com/${this.options.audioMeaning}`),
      new Audio(`https://rslang-bc.herokuapp.com/${this.options.audioExample}`),
    ];
  }

  public init() {
    this.element.insertAdjacentHTML('beforeend', getCardTemplate(this.options));
  }

  public toggleAudio(play: boolean, btn?: HTMLButtonElement | null): void {
    if (play && btn) {
      (this.audios as Array<HTMLAudioElement>)[(this.audios as Array<HTMLAudioElement>).length - 1].addEventListener(
        'ended',
        () => {
          btn.classList.toggle('play-btn_pause');
        },
      );

      for (let i = 0; i < (this.audios as Array<HTMLAudioElement>).length; i++) {
        if (i === 0) {
          (this.audios as Array<HTMLAudioElement>)[i].play();
        } else {
          (this.audios as Array<HTMLAudioElement>)[i - 1].addEventListener('ended', () => {
            (this.audios as Array<HTMLAudioElement>)[i].play();
          });
        }
      }
    } else {
      this.audios?.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }
}
