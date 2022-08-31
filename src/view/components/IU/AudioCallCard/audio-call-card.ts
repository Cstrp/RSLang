import {content, Template} from '@/view/Template';
import {getAudioCallTemplate} from './audio-call-card.view';
import {IAudioCallCard} from './models';

export class AudioCallCard extends Template {
  constructor(
    public parent: HTMLElement | null,
    public tagName: keyof HTMLElementTagNameMap,
    public options: IAudioCallCard,
    public translationWords: Array<string>,
    public className?: content,
    public value?: content,
    public attr?: object,
  ) {
    super(parent, tagName, className, value, attr);
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
