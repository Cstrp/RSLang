import {Template} from '@/view/Template';
<<<<<<< HEAD
import {content} from '@/data/types';

class Button extends Template {
  public onClick: () => void = () => {};

  public onSubmit: (evt: Event) => void = () => {};

  constructor(parent: HTMLElement, className?: string, value?: content, state: boolean = false, type?: string) {
    super(parent, 'button', null, value);

    if (className) this.element.classList.add(...className.split(' '));

    if (state) this.setDisable(true);

    this.element.setAttribute('type', type || 'button');

    if (type === 'submit') {
      this.element.onsubmit = (evt) => this.onSubmit(evt);
    }

    this.element.onclick = () => this.onClick();
=======
import style from './index.module.scss';
import {content} from '@/data/types';

class Button extends Template {
  public onClickBtn: () => void = () => {};

  constructor(parent: HTMLElement, className?: content, value?: content, state: boolean = false) {
    super(parent, 'button', style.btn, value);

    if (className) this.element.classList.add(...className);

    if (state) this.setDisable(true);

    this.element.addEventListener('click', () => this.onClickBtn());
>>>>>>> develop
  }

  public setDisable(condition: boolean = false): void {
    this.element.toggleAttribute('disabled', condition);
  }

  public removeDisable(): void {
    this.element.removeAttribute('disabled');
  }
}

export {Button};
