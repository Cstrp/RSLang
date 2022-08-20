import {Template} from '@/view/Template';
import {content} from '@/data/types';

class Button extends Template {
  public onClick: () => void = () => {};

  public onSubmit: (evt: Event) => void = () => {};

  constructor(parent: HTMLElement, className?: string, value?: content, state: boolean = false, type?: string) {
    super(parent, 'button', null, value);

    if (className) this.element.classList.add(...className.split(' '));

    if (state) this.setDisable(true);

    this.element.setAttribute('type', type as string);

    if (type === 'submit') {
      this.element.onsubmit = (evt) => this.onSubmit(evt);
    }

    this.element.onclick = () => this.onClick();
  }

  public setDisable(condition: boolean = false): void {
    this.element.toggleAttribute('disabled', condition);
  }

  public removeDisable(): void {
    this.element.removeAttribute('disabled');
  }
}

export {Button};
