import {IStatisticsResponse} from '@/data/interfaces/IStatistics';
import {get} from '@/data/utils/_storage';
import {users} from '@/data/const';

const getGameStatistics = (statistics: IStatisticsResponse): Promise<void> =>
  fetch(`${users}/${get('userID')}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Owner ${get('refreshToken')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  }).then((res) => res.json());

const getStatistics = (): Promise<IStatisticsResponse> =>
  fetch(`${users}/${get('userID')}/statistics`, {
    headers: {
      Authorization: `Owner ${get('refreshToken')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

export {getStatistics, getGameStatistics};
