import axios from 'axios';

export const getSprintWords = (query?: string) =>
  axios
    .get(query ? `https://rslang-bc.herokuapp.com/words?${query}` : 'https://rslang-bc.herokuapp.com/words')
    .then((res) => res.data)
    .catch((error: Error) => {
      throw new Error(error.message);
    });
