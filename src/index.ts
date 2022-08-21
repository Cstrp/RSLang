import './view/styles/common.scss';
import axios from 'axios';
import {App} from '@/view/pages/App';

const app = new App();

app.render();

axios
  .post('http://localhost:9000', {
    name: 'Vasya',
    age: 25,
  })
  .then((response) => {
    console.log(response);
  });
