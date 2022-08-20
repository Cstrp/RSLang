import {Template} from '@/view/Template';
import {IUser} from '@/data/interfaces/IUser';
import {Input} from '@/view/components/IU/Input';
import {Button} from '@/view/components/IU/Button';
import {createUser} from '@/data/api/user';
import {validEmail, validPass} from '@/data/utils/_validator';

class AuthOptions extends Template {
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
    super(parent, 'div', 'submit');

    this.input = new Input(this.element, 'text', 'input_name');
    this.input.getValue = (evt) => this.updateState('name', evt);

    this.inputEmail = new Input(this.element, 'email', 'input_email');
    this.inputEmail.getValue = (evt) => this.updateState('email', evt);

    this.inputPassword = new Input(this.element, 'password', 'input_password');
    this.inputPassword.getValue = (evt) => this.updateState('password', evt);

    this.button = new Button(this.element, 'submit_btn', 'Зарегистрироваться', false, 'submit');
    this.button.element.setAttribute('disabled', '');
    this.button.onClick = () => {
      if (this.validate(this.state.name, this.state.email, this.state.password)) {
        this.createUser(this.state);
      } else {
        const err = new Template(this.element, 'div', 'error_message', 'Введены некорректные данные');

        setTimeout(() => {
          err.removeElement();
        }, 5000);
      }
      // добавить описание (интуитивно - непонятно)
      /// pass минимум 8 символов максимум 16, одна строчная / заглавная (мин) + спец символ
      // email обязательный символ @ и точка
      // имя не может быть пустым

      createUser(this.state);
      this.resetState();
    };
  }

  resetState(): void {
    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.updateInput();
  }

  validate(name: string, email: string, password: string): boolean {
    return name !== '' && validEmail(email) && validPass(password);
  }

  updateInput() {
    (this.input.element as HTMLInputElement).value = this.state.name;
    (this.inputEmail.element as HTMLInputElement).value = this.state.email;
    (this.inputPassword.element as HTMLInputElement).value = this.state.password;

    this.button.element.toggleAttribute(
      'disabled',
      this.state.name === '' || this.state.email === '' || this.state.password === '',
    );
  }

  updateState(key: keyof IUser, evt: Event): void {
    const input = evt.target as HTMLInputElement;

    this.state[key] = input.value;

    this.button.element.toggleAttribute(
      'disabled',
      this.state.name === '' || this.state.email === '' || this.state.password === '',
    );
  }
}

export {AuthOptions};
