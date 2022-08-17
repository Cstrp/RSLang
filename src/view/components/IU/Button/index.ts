import {Template} from '@/view/Template';
import style from './index.module.scss';
import {content} from '@/data/types';

class Button extends Template {
  public onClickBtn: () => void = () => {};

  constructor(parent: HTMLElement, className?: content, value?: content, state: boolean = false) {
    super(parent, 'button', style.btn, value);

    if (className) this.element.classList.add(...className);

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
