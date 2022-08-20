import {signin} from '@/data/const';
import {set} from '@/data/utils/_storage';
import {ISignInUser} from '../../interfaces/ISignInUser';

const signIn = async (user: ISignInUser) => {
  let date: Date | string = new Date().toString();
  const time: number = 14400000;
  const data = await fetch(`${signin}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (data.status === 200) {
    const res = await data.json();

    date += time;
    set('time', date);
    set('token', res.token);
    set('refreshToken', res.refreshToken);
    set('userID', res.userId);
  } else {
    throw new Error(data.statusText);
  }
};

export {signIn};
