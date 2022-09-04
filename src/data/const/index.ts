import {ILink} from '@/data/interfaces/ILink';

const url = 'https://rslang-bc.herokuapp.com';
const users = `${url}/users`;
const signin = `${url}/signin`;

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
  'Для регистрации нового пользователя необходимо:',
  '* Поле ввода имени не может быть пустым, и должно содержать в себе одну заглавную букву (только на английском' +
    ' языке), и не менее 3-х символов',
  `* Поле ввода почтового адрес должно содержать в себе обязательный специальный символ "@" с указанием домена (Пример:
  .com || .ru)`,
  `* Поле ввода пароля: пароль должен содержать в себе от 8 до 16-ти символов.
  Минимум одна заглавная, строчная буквы, один специальный символ, одна цифра.
  `,
];

export {link, users, url, signin, description};
