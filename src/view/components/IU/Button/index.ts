import {Template} from '@/view/Template';

class Button extends Template {
  public onClickBtn: () => void = () => {};

  constructor(parent: HTMLElement, className?: string, value?: string, state: boolean = false) {
    super(parent, 'button', null, value);

    if (className) this.element.classList.add(...className.split(' '));

    if (state) this.setDisable(true);

    this.element.addEventListener('click', () => this.onClickBtn());
  }

  public setDisable(condition: boolean = false): void {
    this.element.toggleAttribute('disabled', condition);
  }

  public removeDisable(): void {
    this.element.removeAttribute('disabled');
  }
}

export {Button};
