import {IUser} from '@/data/interfaces/IUser';
import {users} from '@/data/const';

const createUser = async (user: IUser) => {
  try {
    const data = await fetch(`${users}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (data.status === 200) return data;
  } catch (err) {
    throw new Error(err);
  }
};

export {createUser};
