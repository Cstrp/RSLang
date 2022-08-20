import {users} from '@/data/const';
import {get, set} from '@/data/utils/_storage';

const tokenValidation = async () => {
  const date = new Date().toString();

  if (get('time') > date) return get('token');

  return tokenRefresher();
};

const tokenRefresher = async () => {
  let date: Date | string = new Date().toString();
  const time: number = 14400000;

  const data = await fetch(`${users}/${get('userID')}/tokens`, {
    method: 'GET',
    headers: {
      Authorization: `Owner ${get('refreshToken')}`,
      Accept: 'application/json',
    },
  });

  if (data.status === 200) {
    const res = await data.json();

    date += time;

    set('time', date);
    set('token', res.token);
    set('refreshToken', res.refreshToken);

    return get('token');
  }

  set('userID', '');
  set('token', '');
  set('newToken', '');
  set('time', '');
};

export {tokenRefresher, tokenValidation};
