import axios from 'axios';
import {ICard} from '@/view/components/Card/models/card.model';

export const getWords = (query?: string): Promise<Array<ICard>> =>
  axios
    .get(query ? `https://rslang-bc.herokuapp.com/words?${query}` : 'https://rslang-bc.herokuapp.com/words')
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.message);
    });
