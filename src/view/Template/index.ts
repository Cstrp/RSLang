import {content} from '@/data/types';

class Template {
  element: HTMLElement;

  constructor(
    parent: HTMLElement,
    tagName: keyof HTMLElementTagNameMap = 'div',
    className: content,
    value?: content,
    attr?: Record<string, unknown>,
  ) {
    this.element = document.createElement(tagName);

    if (typeof value === 'string') this.element.innerHTML = value;

    if (typeof className === 'string') this.element.classList.add(...className.split(' '));

    if (parent) parent.append(this.element);

    if (attr) {
      for (const [key, value] of Object.entries(attr)) {
        this.element.setAttribute(key, value as string);
      }
    }
  }

  removeElement(): void {
    this.element.remove();
  }

  render(): HTMLElement {
    return this.element;
  }
}

export {Template};
