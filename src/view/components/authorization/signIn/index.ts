import {Template} from '@/view/Template';
import style from './index.module.scss';
import {Input} from '@/view/components/IU/Input';
import {Button} from '@/view/components/IU/Button';
import {ISignInUser} from '@/data/interfaces/ISignInUser';
import {signIn} from '@/data/api/signIn';
import {clear} from '@/data/utils/_storage';

class SignIn extends Template {
  public signUpUser: (prop: ISignInUser) => void = () => {};

  private email: Input;

  private password: Input;

  private signIn: Button;

  private signOut: Button;

  private close: Button;

  public state = {
    email: '',
    password: '',
  };

  constructor(parent: HTMLElement) {
    super(parent, 'div', style.signIn);

    this.email = new Input(this.element, 'text', style.input, null, {
      placeholder: 'Введите адрес электронной почты...',
    });
    this.email.getValue = (evt) => this.updateState('email', evt);

    this.password = new Input(this.element, 'password', style.input, null, {
      placeholder: 'Введите пароль...',
      autocomplete: 'current-password',
    });
    this.password.getValue = (evt) => this.updateState('password', evt);

    const btns = new Template(this.element, 'div', style.btns);

    this.signIn = new Button(btns.element, style.btn, 'Войти', false, 'submit');
    this.signIn.element.setAttribute('disabled', '');
    this.signIn.onClick = () => {
      this.signUpUser(this.state);
      signIn(this.state);
      this.resetState();
    };

    this.close = new Button(btns.element, style.close, 'Закрыть', false);
    this.close.onClick = () => this.element.remove();

    this.signOut = new Button(btns.element, style.btnSig, 'Выйти', false, 'submit');
    this.signOut.onClick = () => {
      clear();
      this.element.remove();
    };
  }

  private updateState(key: keyof ISignInUser, evt: Event): void {
    const input = evt.target as HTMLInputElement;

    this.state[key] = input.value;

    this.signIn.element.toggleAttribute('disabled', this.state.email === '' || this.state.password === '');
  }

  private updateInput() {
    (this.email.element as HTMLInputElement).value = this.state.email;
    (this.password.element as HTMLInputElement).value = this.state.email;

    this.signIn.element.toggleAttribute('disabled', this.state.email === '' || this.state.password === '');

    if (this.state.email !== '' && this.state.password !== '') this.signIn.element.toggleAttribute('disabled', false);
  }

  private resetState() {
    this.state = {
      email: '',
      password: '',
    };

    this.updateInput();
  }
}

export {SignIn};
