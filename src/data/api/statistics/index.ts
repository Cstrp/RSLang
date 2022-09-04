import {IStatisticsResponse} from '@/data/interfaces/IStatistics';
import {users} from '@/data/const';
import {get} from '@/data/utils/_storage';

const getStatistics = async (userID: string): Promise<IStatisticsResponse> => {
  const data = await fetch(`${users}/${userID}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Owner ${get('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return data.json();
};

const getGameStatistics = async (statistics: IStatisticsResponse, userID: string): Promise<void> => {
  const data = await fetch(`${users}/${userID}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Owner ${get('token')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  });

  return data.json();
};

export {getStatistics, getGameStatistics};
