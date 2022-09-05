import {Template} from '@/view/Template';
import {getAudioCallTemplate} from './audio-call-card.view';
import {IAudioCallCard} from './models';
import {content} from '@/data/types';

export class AudioCallCard extends Template {
  constructor(
    public parent: HTMLElement | null,
    public tagName: keyof HTMLElementTagNameMap,
    public options: IAudioCallCard,
    public translationWords: Array<string>,
    public className?: content,
    public value?: content,
    public attr?: Record<string, unknown>,
  ) {
    super(<HTMLElement>parent, tagName, <string>className, value, attr);
  }

  public init(): void {
    this.create();
    this.listen();
  }

  public create(): void {
    this.element.insertAdjacentHTML('beforeend', getAudioCallTemplate(this.options, this.translationWords));
  }

  public listen(): void {
    const audioPlayBtn: HTMLButtonElement | null = document.querySelector('.audio-call-audio-play');

    if (audioPlayBtn) {
      audioPlayBtn.addEventListener('click', this.playAudio);
    }

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.playAudio();
      }
    });
  }

  public playAudio(): void {
    const audioElement: HTMLAudioElement | null = document.querySelector('.audio-call-audio');

    if (audioElement) {
      audioElement.play();
    }
  }
}
