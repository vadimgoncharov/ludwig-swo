import {
  dateToDDMM,
  dateToYYYYMMDD,
  getDayNumberInYear,
  getRandomDate,
  getSeasonName,
  SEASON_NAME_AUTUMN,
  SEASON_NAME_SPRING,
  SEASON_NAME_SUMMER,
  SEASON_NAME_WINTER,
} from 'shared/utils/date';
import {getRandomInt} from 'shared/utils/random';

import {TStatMinMax} from 'shared/types/StatMinMax';
import {TStats} from 'shared/types/Stats';
import {TStatJdan} from 'shared/types/StatJdan';
import {TStatTotalEvenOdd} from 'shared/types/StatTotalEvenOdd';
import {TStatDayInMonth} from 'shared/types/StatDayInMonth';
import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TStatValueAtDayNum} from 'shared/types/StatValueAtDayNum';
import {TStatAround} from 'shared/types/StatAround';
import {TStatSeasons} from 'shared/types/StatSeasons';
import {TStatHalfYear} from 'shared/types/StatHalfYear';
import {TStatLastGeneratedDate} from 'shared/types/StatLastGeneratedDate';
import {TStatDatesAtValue} from 'shared/types/StatDatesAtValue';
import {TStatTower} from 'shared/types/StatTower';
import {isPrimeNumber} from 'shared/utils/math';
import {TStatMonths} from 'shared/types/StatMonths';
import {TStatMonthsDay} from 'shared/types/StatMonthsDay';

type TStatAll = {
  id: number,
  visitDate: Date,
  generatedDate: Date,
};

const DAY_IN_MS = 3600 * 24 * 1000;
const DATE_NOW = new Date();
let STATS_ALL_LAST_ID = 0;

const generateStatsAll = (): TStatAll[] => {
  const TODAY = new Date();
  const YEAR_AGO = new Date(TODAY.getTime() - DAY_IN_MS * 365);
  let cursor = new Date(YEAR_AGO);

  const stats = [];

  while (cursor.getTime() <= TODAY.getTime()) {
    for (let i = 0; i < getRandomInt(50, 300); i++) {
      stats.push({
        id: ++STATS_ALL_LAST_ID,
        visitDate: new Date(cursor.getTime() + i * 1000),
        generatedDate: getRandomDate(),
      });
    }
    cursor = new Date(cursor.getTime() + DAY_IN_MS);
  }
  return stats;
};

const addDataToStatsAll = (): void => {
  for (let i = 0; i < getRandomInt(1, 4); i++) {
    STATS_TOTAL.push({
      id: ++STATS_ALL_LAST_ID,
      visitDate: new Date(),
      generatedDate: getRandomDate(),
    });
  }
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
      id: item.id,
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
        id: item.id,
        generatedDate: item.generatedDate,
        visitDate: item.visitDate,
      };
    });
};

const getStatAround = (): TStatAround => {
  const lastStatTotalItem = STATS_TOTAL[STATS_TOTAL.length - 1];
  const todayDate     = lastStatTotalItem.generatedDate;
  const yesterdayDate = new Date(todayDate.getTime() - DAY_IN_MS);
  const tomorrowDate  = new Date(todayDate.getTime() + DAY_IN_MS);
  const todayDateStr      = dateToYYYYMMDD(todayDate);
  const yesterdayDateStr  = dateToYYYYMMDD(yesterdayDate);
  const tomorrowDateStr   = dateToYYYYMMDD(tomorrowDate);

  const statAround: TStatAround = {
    yesterday: {
      id: 1,
      value: 0,
      date: yesterdayDate,
    },
    today: {
      id: 2,
      value: 0,
      date: todayDate,
    },
    tomorrow: {
      id: 3,
      value: 0,
      date: tomorrowDate,
    },
  };
  STATS_TOTAL.forEach((item) => {
    const date = dateToYYYYMMDD(item.generatedDate);
    switch (date) {
      case yesterdayDateStr:
        statAround.yesterday.value++;
        break;
      case todayDateStr:
        statAround.today.value++;
        break;
      case tomorrowDateStr:
        statAround.tomorrow.value++;
        break;
    }
  });
  return statAround;
};

const getStatSeasons = (): TStatSeasons => {
  const seasons = {
    winter: 0,
    spring: 0,
    summer: 0,
    autumn: 0,
  };

  STATS_TOTAL.forEach((item) => {
    switch (getSeasonName(item.generatedDate)) {
      case SEASON_NAME_WINTER:
        seasons.winter++;
        break;
      case SEASON_NAME_SPRING:
        seasons.spring++;
        break;
      case SEASON_NAME_SUMMER:
        seasons.summer++;
        break;
      case SEASON_NAME_AUTUMN:
        seasons.autumn++;
        break;
    }
  });

  return seasons;
};

const FIRST_HALF_YEAR_MONTHS = [0, 1, 2, 3, 4, 5];
const getStatHalfYear = (): TStatHalfYear => {
  const stats = {
    first: 0,
    second: 0,
  };

  STATS_TOTAL.forEach((item) => {
    const month = item.generatedDate.getMonth();
    if (FIRST_HALF_YEAR_MONTHS.indexOf(month) !== -1) {
      stats.first++;
    } else {
      stats.second++;
    }
  });

  return stats;
};

const getStatLastGeneratedDate = (): TStatLastGeneratedDate => {
  const lastStatTotalItem = STATS_TOTAL[STATS_TOTAL.length - 1];
  const data = {
    id: lastStatTotalItem.id,
    date: lastStatTotalItem.generatedDate,
    value: 0,
  };
  const generatedDateStr = dateToYYYYMMDD(data.date);

  STATS_TOTAL.forEach((item) => {
    const dateStr = dateToYYYYMMDD(item.generatedDate);
    if (dateStr === generatedDateStr) {
      data.value++;
    }
  });

  return data;
};

const getDayInMonthStats = (): TStatDayInMonth => {
  const data = STATS_TOTAL;
  const dayInMonthStatCount: {
    [key: string]: TStatValueAtDayNum,
  } = {};
  data.forEach((item) => {
    const dayNum = item.generatedDate.getDate();
    if (!dayInMonthStatCount[dayNum]) {
      dayInMonthStatCount[dayNum] = {
        dayNum,
        value: 0,
      }
    }
    dayInMonthStatCount[dayNum].value++;
  });

  return Object.keys(dayInMonthStatCount).map((dayNum) => {
    return {
      ...dayInMonthStatCount[dayNum],
      months: [], // we should fill it with values like in ApiResponseConverter
    };
  });
};

const getDayInYearStats = (): TStatDayInYear => {
  const data = STATS_TOTAL;
  const dayInYearStatCount: {
    [key: string]: TStatValueAtDayNum,
  } = {};
  data.forEach((item) => {
    const d = item.generatedDate;
    const dayNum = getDayNumberInYear(d.getFullYear(), d.getMonth(), d.getDate());
    const key = dateToYYYYMMDD(item.generatedDate);
    if (!dayInYearStatCount[key]) {
      dayInYearStatCount[key] = {
        dayNum,
        value: 0,
      }
    }
    dayInYearStatCount[key].value++;
  });

  return Object.keys(dayInYearStatCount).map((key) => {
    return dayInYearStatCount[key];
  }).sort((a, b) => a.dayNum - b.dayNum);
};

const getTowerStats = (): TStatTower => {
  const data = STATS_TOTAL;
  const dayInYearStatCount: {
    [key: string]: {
      date: Date,
      value: number,
    },
  } = {};
  data.forEach((item) => {
    const d = item.generatedDate;
    const dayNum = getDayNumberInYear(d.getFullYear(), d.getMonth(), d.getDate());
    const key = dayNum.toString();
    if (!dayInYearStatCount[key]) {
      dayInYearStatCount[key] = {
        date: d,
        value: 0,
      }
    }
    dayInYearStatCount[key].value++;
  });

  const valuesObj: {
    [key: string]: TStatDatesAtValue,
  } = {};

  Object.keys(dayInYearStatCount).forEach((dayNum) => {
    const item = dayInYearStatCount[dayNum];
    const newKey = item.value.toString();
    if (!valuesObj[newKey]) {
      valuesObj[newKey] = {
        dates: [],
        value: item.value,
        isPrimeValue: isPrimeNumber(item.value),
      }
    }
    valuesObj[newKey].dates.push(item.date);
    return valuesObj;
  });

  const statMinMax = getMinMax();

  for (let value = statMinMax[statMinMax.length - 1].value; value < statMinMax[0].value; value++) {
    const key = value.toString();
    if (!valuesObj[key]) {
      valuesObj[key] = {
        dates: [],
        value,
        isPrimeValue: isPrimeNumber(value),
      };
    }
  }

  const valuesObjSorted = Object.keys(valuesObj).map((key) => {
    return valuesObj[key];
  }).sort((a, b) => b.value - a.value);

  return valuesObjSorted;
};


const getMonthStats = (): TStatMonths => {
  const data = STATS_TOTAL;
  const monthsStat: {
    [key: string]: {
      id: number,
      date: Date,
      value: number,
    },
  } = {};
  data.forEach((item) => {
    const d = item.generatedDate;
    const key = item.generatedDate.getMonth();
    if (!monthsStat[key]) {
      monthsStat[key] = {
        id: item.id,
        date: new Date(DATE_NOW.getFullYear(), d.getMonth(), d.getDate()),
        value: 0,
      }
    }
    monthsStat[key].value++;
  });

  return Object.keys(monthsStat).map((key) => {
    return monthsStat[key];
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
};

const getMonthsDayStat = (): TStatMonthsDay => {
  const data = STATS_TOTAL;
  const lastStatTotalItem = STATS_TOTAL[STATS_TOTAL.length - 1];
  const lastGeneratedDate = lastStatTotalItem.generatedDate;
  const lastGeneratedDay = lastGeneratedDate.getDate();
  const obj: {
    [key: string]: {
      id: number,
      date: Date,
      value: number,
    },
  } = {};
  data.forEach((item) => {
    if (item.generatedDate.getDate() === lastGeneratedDay) {
      const key = dateToDDMM(item.generatedDate);
      if (!obj[key]) {
        obj[key] = {
          id: item.id,
          date: new Date(DATE_NOW.getFullYear(), item.generatedDate.getMonth(), lastGeneratedDay),
          value: 0,
        };
      }
      obj[key].value++;
    }
  });

  return Object.keys(obj).map((key) => {
    return obj[key];
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
};

const getAllStatsData = (): TStats => {
  const stat = {
    statTotal: {
      id: STATS_TOTAL[STATS_TOTAL.length - 1].id,
      date: STATS_TOTAL[STATS_TOTAL.length - 1].generatedDate,
      value: STATS_TOTAL.length,
    },
    statLastGeneratedDate: getStatLastGeneratedDate(),
    statTotalEvenOdd: getStatTotalEvenOdd(),
    statPrevDates: getLastStatsAllByLimit(10).map((item) => {
      return {
        id: item.id,
        date: item.generatedDate,
      }
    }),
    statMinMax: getMinMax(),
    statJdan: getJdanData(),
    statDayInMonth: getDayInMonthStats(),
    statDayInYear: getDayInYearStats(),
    statAround: getStatAround(),
    statSeasons: getStatSeasons(),
    statHalfYear: getStatHalfYear(),
    statTower: getTowerStats(),
    statMonths: getMonthStats(),
    statMonthsDay: getMonthsDayStat(),
  };
  return stat;
};

export {
  getAllStatsData,
  addDataToStatsAll,
};
