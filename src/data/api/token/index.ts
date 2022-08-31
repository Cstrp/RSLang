import {users} from '@/data/const';
import {get, set} from '@/data/utils/_storage';

const tokenValidation = async () => {
  const date = new Date().toString();

  if (get('time') > date) return get('token');

  return tokenRefresher();
};

const tokenRefresher = async () => {
  const date: Date | string = new Date().toString();

  const data = await fetch(`${users}/${get('userID')}/tokens`, {
    method: 'GET',
    headers: {
      Authorization: `Owner ${get('refreshToken')}`,
      Accept: 'application/json',
    },
  });

  if (data.status === 200) {
    const res = await data.json();

    set('time', date.toString());
    set('token', res.token);
    set('refreshToken', res.refreshToken);
    set('userID', res.userId);
    set('userName', res.name);

    return get('token');
  }

  set('userID', '');
  set('token', '');
  set('newToken', '');
  set('time', '');
};

export {tokenRefresher, tokenValidation};
