import apiResponseMapper from './apiResponseMapper';
// import * as mockData from './mockData';
import {TStats} from 'shared/types/Stats';
import {IApiResponse} from 'shared/types/IApiResponse';

// function getStatsMock(): Promise<TStats> {
//   return new Promise<TStats>((resolve) => {
//     setTimeout(() => {
//       mockData.addDataToStatsAll();
//       const data: TStats = mockData.getAllStatsData();
//       resolve(data);
//     }, 500);
//   });
// }

function getStatsReal(url: string): Promise<TStats> {
  return new Promise<TStats>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        try {
          const rawData: IApiResponse = JSON.parse(xhr.responseText);
          const convertedData = apiResponseMapper(rawData);
          resolve(convertedData);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send(null);
  });
}

function getStats() {
  // TODO Move urls to config
  if (process.env.NODE_ENV !== 'production' && window.location.hostname === 'localhost') {
    return getStatsReal('http://localhost:4444/new/?@format=json');
  }
  else if (window.location.host.match(/.github.io$/i)) {
    return getStatsReal('https://ludwig-swo-zeit-iyjhyxaugi.now.sh/');
  } else {
    return getStatsReal('https://ldwg.ru/new/?@format=json');
  }
}

export {
  getStats,
};
