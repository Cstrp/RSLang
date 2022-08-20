import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Input} from '@/view/components/IU/Input';
import {Button} from '@/view/components/IU/Button';
import {ISignUpUser} from '@/data/interfaces/ISignUpUser';

class Popup extends Template {
  private email!: Input;

  private password!: Input;

  private button!: Button;

  private loginIn: () => void = () => {};

  public state = {
    email: '',
    password: '',
  };

  constructor(parent: HTMLElement) {
    super(parent, 'div', style.popup);
  }

  private updateState(key: keyof ISignUpUser, evt: Event): void {
    const input = evt.target as HTMLInputElement;

    this.state[key] = input.value;

    this.button.element.toggleAttribute('disabled', this.state.email === '' || this.state.password === '');
  }

  private updateInput() {
    (this.email.element as HTMLInputElement).value = this.state.email;
    (this.password.element as HTMLInputElement).value = this.state.email;

    this.button.element.toggleAttribute('disabled', this.state.email === '' || this.state.password === '');
  }

  private resetState() {
    this.state = {
      email: '',
      password: '',
    };

    this.updateInput();
  }
}

export {Popup};
