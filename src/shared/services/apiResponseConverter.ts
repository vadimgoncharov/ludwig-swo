import {getDayNumberInYear} from 'shared/utils/date';
import {convertRange, isPrimeNumber} from 'shared/utils/math';

import {IApiResponse} from '../types/IApiResponse';
import {TStats} from '../types/Stats';

const NOW = new Date();
const apiResponseConverter = (r: IApiResponse): TStats => {
  const statTotalValue = r.oddEven.even + r.oddEven.odd;
  const lastGenerateDate = new Date(NOW.getFullYear(), r.rand_date.month - 1, r.rand_date.day);
  const lastGenerateDateYesterday = new Date(lastGenerateDate.getTime() - 3600 * 24);
  const lastGenerateDateTomorrow = new Date(lastGenerateDate.getTime() + 3600 * 24);

  r.launch.forEach((item) => {
    getDayNumberInYear(2100, item.month - 1, item.day);
  });

  const stat = {
    statTotal: {
      id: statTotalValue,
      date: lastGenerateDate,
      value: statTotalValue,
    },
    statLastGeneratedDate: {
      id: undefined,
      date: lastGenerateDate,
      value: r.months[r.rand_date.month].days[r.rand_date.day].counter,
    },
    statTotalEvenOdd: {
      evenValue: r.oddEven.even,
      oddValue: r.oddEven.odd,
    },
    statPrevDates: r.lastSeen.slice(0, 10).map((item, index: number) => {
      return {
        id: statTotalValue - (index + 1),
        date: new Date(NOW.getFullYear(), item.month - 1, item.day),
      };
    }),
    statMinMax: r.top.slice(0, 4).concat(r.shame.slice(0, 4).reverse()).map((item) => {
      return {
        id: undefined,
        value: item.counter,
        date: new Date(NOW.getFullYear(), item.month - 1, item.day),
      }
    }),
    statJdan: r.lastSeen.slice(0, 5).map((item) => {
      return {
        id: undefined,
        chValue: convertRange(
          r.months[item.month].days[item.day].counter,
          r.shame[0].counter,
          r.top[0].counter,
          100,
          200,
        ),
        value: convertRange(
          r.months[item.month].days[item.day].counter,
          r.shame[0].counter,
          r.top[0].counter,
          5000,
          5300,
        ),
        date: new Date(NOW.getFullYear(), item.month - 1, item.day),
      };
    }),
    statDayInMonth: r.days.map((item) => {
      return {
        dayNum: item.day,
        value: item.sum,
      };
    }),
    statDayInYear: r.launch.map((item) => {
      return {
        dayNum: item.day_of_year,
        value: item.counter,
      };
    }).sort((a, b) => a.dayNum - b.dayNum),
    statAround: {
      today: {
        id: undefined,
        value: r.months[r.rand_date.month].days[r.rand_date.day].counter,
        date: lastGenerateDate,
      },
      yesterday: {
        id: undefined,
        value: r.months[lastGenerateDateYesterday.getMonth() + 1].days[lastGenerateDateYesterday.getDate()].counter,
        date: lastGenerateDateYesterday,
      },
      tomorrow: {
        id: undefined,
        value: r.months[lastGenerateDateTomorrow.getMonth() + 1].days[lastGenerateDateTomorrow.getDate()].counter,
        date: lastGenerateDateTomorrow,
      },
    },
    statSeasons: {
      winter: r.months[12].sum + r.months[1].sum + r.months[2].sum,
      spring: r.months[3].sum + r.months[4].sum + r.months[5].sum,
      summer: r.months[6].sum + r.months[7].sum + r.months[8].sum,
      autumn: r.months[9].sum + r.months[10].sum + r.months[11].sum,
    },
    statHalfYear: {
      first: [1, 2, 3, 4, 5, 6].reduce((sum, month) => sum + r.months[month].sum, 0),
      second: [7, 8, 9, 10, 11, 12].reduce((sum, month) => sum + r.months[month].sum, 0),
    },
    statTower: (() => {
      const {tvTower} = r;
      const values = Object.keys(tvTower);
      const min = Math.min.apply(null, values);
      const max = Math.max.apply(null, values);
      const finalData = [];
      for (let value = max; value >= min; value--) {
        const data = tvTower[value];
        if (data) {
          const dates = data.date.split(',').map((date) => {
            const [day, month] = date.split('-');
            return new Date(NOW.getFullYear(), parseInt(month) - 1, parseInt(day));
          });
          finalData.push({
            dates,
            value: parseInt(value),
            isPrimeValue: !!data.is_prime,
          });
        }
        else {
          finalData.push({
            dates: [],
            value: parseInt(value),
            isPrimeValue: isPrimeNumber(value),
          });
        }
      }
      return finalData;
    })(),
    statMonths: Object.keys(r.months).map((month) => {
      return {
        id: undefined,
        date: new Date(NOW.getFullYear(), parseInt(month) - 1, 1),
        value: r.months[month].sum,
      }
    }),
    statMonthsDay: Object.keys(r.months).map((month) => {
      const dayData = r.months[month].days[r.rand_date.day];
      return {
        id: undefined,
        date: new Date(NOW.getFullYear(), parseInt(month) - 1, 1),
        value: dayData ? dayData.counter : 0,
      }
    }),
  };

  return stat;
};

export default apiResponseConverter;
