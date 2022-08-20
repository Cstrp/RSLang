import {Template} from '@/view/Template';
import {IUser} from '@/data/interfaces/IUser';
import {Input} from '@/view/components/IU/Input';
import {Button} from '@/view/components/IU/Button';
import {createUser} from '@/data/api/user';
import {validEmail, validPass} from '@/data/utils/_validator';
import style from './index.module.scss';

class UserRegistration extends Template {
  private createUser: (prop: IUser) => void = () => {};

  private input!: Input;

  private inputEmail!: Input;

  private inputPassword!: Input;

  private button!: Button;

  private state = {
    name: '',
    email: '',
    password: '',
  };

  constructor(parent: HTMLElement) {
    super(parent, 'div', style.regForm);

    this.input = new Input(this.element, 'text', style.input, null, {
      placeholder: 'Введите имя пользователя...',
    });
    this.input.getValue = (evt) => this.updateState('name', evt);

    this.inputEmail = new Input(this.element, 'email', style.input, null, {
      placeholder: 'Введите адрес электронной почты...',
    });
    this.inputEmail.getValue = (evt) => this.updateState('email', evt);

    this.inputPassword = new Input(this.element, 'password', style.input, null, {
      placeholder: 'Введите новый пароль...',
    });
    this.inputPassword.getValue = (evt) => this.updateState('password', evt);

    const btns = new Template(this.element, 'div', style.btns);

    this.button = new Button(btns.element, style.btn, 'Зарегистрироваться', false, 'submit');
    this.button.element.setAttribute('disabled', '');
    this.button.onClick = () => {
      if (this.validate(this.state.name, this.state.email, this.state.password)) {
        this.createUser(this.state);
      } else {
        const err = new Template(this.element, 'div', style.error, 'Неверные данные пользователя');

        setTimeout(() => {
          err.removeElement();
        }, 5000);
      }

      createUser(this.state);
      this.resetState();
    };
  }

  private resetState(): void {
    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.updateInput();
  }

  private validate(name: string, email: string, password: string): boolean {
    return name !== '' && validEmail(email) && validPass(password);
  }

  private updateInput() {
    (this.input.element as HTMLInputElement).value = this.state.name;
    (this.inputEmail.element as HTMLInputElement).value = this.state.email;
    (this.inputPassword.element as HTMLInputElement).value = this.state.password;

    this.button.element.toggleAttribute(
      'disabled',
      this.state.name === '' || this.state.email === '' || this.state.password === '',
    );
  }

  private updateState(key: keyof IUser, evt: Event): void {
    const input = evt.target as HTMLInputElement;

    this.state[key] = input.value;

    this.button.element.toggleAttribute(
      'disabled',
      this.state.name === '' || this.state.email === '' || this.state.password === '',
    );
  }
}

export {UserRegistration};
