import apiResponseConverter from './apiResponseConverter';
import * as mockData from './mockData';
import {TStats} from 'shared/types/Stats';
import {IApiResponse} from 'shared/types/IApiResponse';

function getStatsMock(): Promise<TStats> {
  return new Promise<TStats>((resolve) => {
    setTimeout(() => {
      mockData.addDataToStatsAll();
      const data: TStats = mockData.getAllStatsData();
      resolve(data);
    }, 500);
  });
}

function getStatsReal(url: string): Promise<TStats> {
  return new Promise<TStats>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        try {
          const rawData: IApiResponse = JSON.parse(xhr.responseText);
          const convertedData = apiResponseConverter(rawData);
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
  if (window.location.protocol === 'https:') {
    // We use this because github serves over https, but ludwig servers over http,
    // so we have mixed content error and we need to use proxy
    return getStatsReal('https://ludwig-swo-zeit-iyjhyxaugi.now.sh/');
  } else {
    return getStatsReal('http://ludwigbistronovsky.ru/new/?@format=json');
  }
}

export {
  getStats,
};
