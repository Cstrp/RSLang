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

const url = 'https://rslang-bc.herokuapp.com';
const users = `${url}/users`;
const signin = `${url}/signin`;

export {link, users, url, signin};
