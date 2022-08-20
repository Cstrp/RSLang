import {ILink} from '@/data/interfaces/ILink';

const link: ILink = {
  links: {
    home: '#/home',
    team: '#/team',
    book: '#/book',
    audiocall: '#/audiocall',
    sprint: '#/sprint',
    statistics: '#/statistics',
    authorization: '#/authorization',
  },
};

const description = [
  'Для регстрации нового пользователя необходимо:',
  '* Поле ввода имени не может быть пустым',
  `* Поле ввода почтового адрес должно содержать в себе обязательный специальный символ "@" с указанием домена (Пример:
  .com || .ru)`,
  `* Поле ввода пароля: пароль должен содержать в себе от 8 до 16-ти символов.
  Минимум одна заглавная, строчная буквы, один специальный символ, одна цифра.
  `,
];

const url = 'https://rslang-bc.herokuapp.com';
const users = `${url}/users`;
const signin = `${url}/signin`;

export {link, users, url, signin, description};
