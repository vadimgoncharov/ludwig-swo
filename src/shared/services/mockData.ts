import {dateToYYYYMMDD, getRandomDate} from 'shared/utils/date';
import {getRandomInt} from 'shared/utils/random';

import {TStatMinMax} from 'shared/types/StatMinMax';
import {TStats} from 'shared/types/Stats';
import {TStatJdan} from 'shared/types/StatJdan';
import {TStatTotalEvenOdd} from 'shared/types/StatTotalEvenOdd';

type TStatAll = {
  visitDate: Date,
  generatedDate: Date,
};

const generateStatsAll = (): TStatAll[] => {
  const DAY_IN_MS = 3600 * 24 * 1000;
  const TODAY = new Date();
  const YEAR_AGO = new Date(TODAY.getTime() - DAY_IN_MS * 365);
  let cursor = new Date(YEAR_AGO);

  const stats = [];

  while (cursor.getTime() <= TODAY.getTime()) {
    for (let i = 0; i < getRandomInt(50, 300); i++) {
      stats.push({
        visitDate: new Date(cursor.getTime() + i * 1000),
        generatedDate: getRandomDate(),
      });
    }
    cursor = new Date(cursor.getTime() + DAY_IN_MS);
  }
  return stats;
};

const addDataToStatsAll = (): void => {
  STATS_TOTAL.push({
    visitDate: new Date(),
    generatedDate: getRandomDate(),
  });
};

const STATS_TOTAL = generateStatsAll();

const getMinMax = (): TStatMinMax => {
  const data = STATS_TOTAL;
  const minMaxObj = {};
  data.forEach((item) => {
    const dateStr = dateToYYYYMMDD(item.generatedDate);
    if (!minMaxObj[dateStr]) {
      minMaxObj[dateStr] = {
        generatedDate: item.generatedDate,
        count: 0,
      }
    }
    minMaxObj[dateStr].count++;
  });
  const minMaxArr = [];
  Object.keys(minMaxObj).forEach((dateStr) => {
    minMaxArr.push({
      dateStr,
      count: minMaxObj[dateStr].count,
      generatedDate: minMaxObj[dateStr].generatedDate,
    });
  });
  const sortedByAsc = minMaxArr.slice().sort((a, b) => b.count - a.count);
  const max = sortedByAsc.slice(sortedByAsc.length - 4, sortedByAsc.length);
  const min = sortedByAsc.slice(0, 4);
  return min.concat(max).map((item) => {
    return {
      date: item.generatedDate,
      value: item.count,
    };
  });
};

const getStatTotalEvenOdd = (): TStatTotalEvenOdd => {
  let evenValue = 0;
  let oddValue = 0;

  STATS_TOTAL.forEach((item) => {
    const day = item.generatedDate.getDate();
    if (day % 2 === 0) {
      evenValue++;
    } else {
      oddValue++;
    }
  });

  return {
    evenValue,
    oddValue,
  };
};

const getJdanData = (): TStatJdan => {
  const data = STATS_TOTAL;
  const groupedByDateStr = {};
  data.forEach((item) => {
    const dateStr = dateToYYYYMMDD(item.generatedDate);
    if (!groupedByDateStr[dateStr]) {
      groupedByDateStr[dateStr] = {
        generatedDate: item.generatedDate,
        count: 0,
      }
    }
    groupedByDateStr[dateStr].count++;
  });

  return getLastStatsAllByLimit(5).map((item) => {
    const dateStr = dateToYYYYMMDD(item.generatedDate);
    return {
      date: item.generatedDate,
      value: 7800 + groupedByDateStr[dateStr].count,
      chValue: 100 + groupedByDateStr[dateStr].count,
    };
  });
};

const getLastStatsAllByLimit = (limit: number): TStatAll[] => {
  return STATS_TOTAL.slice(STATS_TOTAL.length - 1 - limit, STATS_TOTAL.length - 1)
    .map((item, index) => {
      return {
        ...item,
        index,
      }
    })
    .sort((a, b) => b.index - a.index)
    .map((item) => {
      return {
        generatedDate: item.generatedDate,
        visitDate: item.visitDate,
      };
    });
};

const getAllStatsData = (): TStats => {
  return {
    statTotal: {
      date: STATS_TOTAL[STATS_TOTAL.length - 1].generatedDate,
      value: STATS_TOTAL.length,
    },
    statTotalEvenOdd: getStatTotalEvenOdd(),
    statPrevDates: getLastStatsAllByLimit(10).map((item) => item.generatedDate),
    statMinMax: getMinMax(),
    statJdan: getJdanData(),
  };
};

export {
  getAllStatsData,
  addDataToStatsAll,
};