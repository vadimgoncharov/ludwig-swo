import * as mockData from './mockData';
import {TStats} from 'shared/types/Stats';

function getStats(): Promise<TStats> {
  return new Promise<TStats>((resolve) => {
    setTimeout(() => {
      mockData.addDataToStatsAll();
      const data: TStats = mockData.getAllStatsData();
      resolve(data);
    }, 500);
  });
}

export {
  getStats,
};
