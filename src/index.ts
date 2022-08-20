import './view/styles/common.scss';
import './view/pages/Textbook/textbook.scss';
import {Textbook} from './view/pages/Textbook';

// example Server usage
// https://rslang-bc.herokuapp.com/doc/ - documentations

// axios.get('https://rslang-bc.herokuapp.com/words').then((res) => {
//   console.log(res.data); // ?page=2&group=0
// }); // words

// axios.get('https://rslang-bc.herokuapp.com/files/img/01_0001.jpg').then((res) => {
//   console.log(res);
// }); // image

// axios.get('https://rslang-bc.herokuapp.com/files/sound/16_3320.mp3').then((res) => {
//   console.log(res);
// }); // mp3 files

const textbook = new Textbook(document.body, 'section', 'textbook-section');

textbook.create();
