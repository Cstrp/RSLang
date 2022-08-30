import {Template} from '@/view/Template';

class Input extends Template {
  public getValue: (evt: Event) => void = () => {};

  constructor(parent: HTMLElement, type: string, className?: string, value?: string) {
    super(parent, 'input', null);

    this.element.setAttribute('type', type);

    if (className) this.element.classList.add(...className.split(' '));

    if (value) this.element.setAttribute('value', value);

    this.element.addEventListener('input', (evt) => this.getValue(evt));
  }
}

export {Input};
