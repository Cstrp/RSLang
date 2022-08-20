export type content = string | null;

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

    if (typeof className === 'string') this.element.classList.add(...className.split(' '));

    if (parent) {
      parent.append(this.element);
    }

    if (value) {
      this.element.innerHTML = value as string;
    }

    if (attr) {
      for (const [key, value] of Object.entries(attr as object)) {
        this.element.setAttribute(key, value as string);
      }
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
