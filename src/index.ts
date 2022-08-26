import './view/styles/common.scss';
// import axios from 'axios';
import {Sprint} from './view/pages/Sprint';

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

const sprintPage = new Sprint(document.body, 'section', 'sprint-section');

sprintPage.renderInitialScreen();
