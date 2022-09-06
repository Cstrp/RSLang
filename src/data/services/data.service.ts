import axios from 'axios';
import {ICard} from '@/view/components/сard/models/card.model';

export const getWords = (query?: string): Promise<Array<ICard>> =>
  axios
    .get(query ? `https://rslang-bc.herokuapp.com/words?${query}` : 'https://rslang-bc.herokuapp.com/words')
    .then((res) => res.data)
    .catch((error: Error) => {
      throw new Error(error.message);
    });
