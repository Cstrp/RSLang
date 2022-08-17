import {content} from '@/data/types';

interface ITemplate {
  parent: HTMLElement | null;
  tagName: keyof HTMLElementTagNameMap;
  className?: content;
  value?: content;
  attr?: object;
}

class Template implements ITemplate {
  public element: HTMLElement;

  public constructor(
    parent: HTMLElement | null,
    tagName: keyof HTMLElementTagNameMap = 'div' as keyof HTMLElementTagNameMap,
    className?: content,
    value?: content,
    attr?: object,
  ) {
    this.element = document.createElement(tagName);

    this.element.classList.add(...(className as string));

    if (parent) parent.append(this.element);

    this.element.innerHTML = value as string;

    for (const [key, value] of Object.entries(attr as object)) {
      this.element.setAttribute(key, value as string);
    }
  }

  tagName: keyof HTMLElementTagNameMap = 'div';

  parent!: HTMLElement | null;

  removeElement(): void {
    this.element.remove();
  }

  render(): HTMLElement {
    return this.element;
  }
}

export {Template};
