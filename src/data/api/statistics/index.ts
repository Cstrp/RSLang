import {users} from '@/data/const';
import {get} from '@/data/utils/_storage';
import {RootObjectOptional} from '@/data/interfaces/IStatistics';

const setStatistics = async (statistics: RootObjectOptional): Promise<void> => {
  const data = await fetch(`${users}/${get('userID')}/statistics`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(statistics),
  });

  return data.json();
};

const getStatistics = async (): Promise<RootObjectOptional> => {
  const data = await fetch(`${users}/${get('userID')}/statistics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return data.json();
};

export {setStatistics, getStatistics};
