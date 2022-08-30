import {Template} from '@/view/Template';

import {content} from '@/data/types';

class Input extends Template {
  public getValue: (evt: Event) => void = () => {};

  constructor(parent: HTMLElement, type: string, className?: string, value?: content, attr?: Record<string, unknown>) {
    super(parent, 'input', null);

    this.element.setAttribute('type', type);

    if (className) this.element.classList.add(...className.split(' '));

    if (value) this.element.setAttribute('value', value as string);

    if (attr) {
      for (const [key, value] of Object.entries(attr)) {
        this.element.setAttribute(key, value as string);
      }
    }

    this.element.addEventListener('input', (evt) => this.getValue(evt));
  }
}

export {Input};
