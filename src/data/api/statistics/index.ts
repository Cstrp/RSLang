import {users} from '@/data/const';
import {get} from '@/data/utils/_storage';
import {IStatistics} from '@/data/interfaces/IStatistics';
import {IDayStatistic} from '@/data/interfaces/IDayStatistic';

const setStatistics = async (statistics: IStatistics): Promise<void> => {
  const data = await fetch(`${users}/${get('userID')}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${get('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });

  return data.json();
};

const getStatistics = async (): Promise<IStatistics & IDayStatistic> => {
  const data = await fetch(`${users}/${get('userID')}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${get('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return data.json();
};

export {setStatistics, getStatistics};
