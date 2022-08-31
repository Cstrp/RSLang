import {signin} from '@/data/const';
import {set} from '@/data/utils/_storage';
import {ISignUpUser} from '../../interfaces/ISignUpUser';
import {ISignInUser} from '@/data/interfaces/ISignInUser';

const signIn = async (user: ISignInUser): Promise<void> => {
  try {
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
      const res: ISignUpUser = await data.json();

      date += time;
      set('time', date);
      set('token', res.token);
      set('refreshToken', res.refreshToken);
      set('userID', res.userId);
      set('userName', res.name);

      setTimeout(() => document.location.reload(), 1500);
    }
  } catch (err) {
    throw new Error(`Authorization error: ${err.message}`);
  }
};

export {signIn};
