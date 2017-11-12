import {
  dateToDayNum,
  dayMonthToDayNum,
} from 'shared/utils/date';
import {convertRange, isPrimeNumber} from 'shared/utils/math';

import {IApiResponse} from '../types/IApiResponse';
import {TStats} from '../types/Stats';

const NOW = new Date();
const apiResponseMapper = (r: IApiResponse): TStats => {
  const statTotalValue = r.oddEven.even + r.oddEven.odd;
  const lastGenerateDate = new Date(NOW.getFullYear(), r.rand_date.month - 1, r.rand_date.day);
  const lastGenerateDateYesterday = new Date(lastGenerateDate.getTime() - 3600 * 24);
  const lastGenerateDateTomorrow = new Date(lastGenerateDate.getTime() + 3600 * 24);

  const stat = {
    total: {
      id: statTotalValue,
      dayNum: dateToDayNum(lastGenerateDate),
      value: statTotalValue,
    },
    lastGeneratedDate: {
      dayNum: dateToDayNum(lastGenerateDate),
      value: r.months[r.rand_date.month].days[r.rand_date.day].counter,
    },
    totalEvenOdd: {
      evenValue: r.oddEven.even,
      oddValue: r.oddEven.odd,
    },
    prevDates: r.lastSeen.slice(0, 10).map((item, index: number) => {
      return {
        id: statTotalValue - (index + 1),
        dayNum: dayMonthToDayNum(item.day, item.month - 1),
      };
    }),
    minMax: r.top.slice(0, 4).concat(r.shame.slice(0, 4).reverse()).map((item) => {
      return {
        value: item.counter,
        dayNum: dayMonthToDayNum(item.day, item.month - 1),
      }
    }),
    jdan: (() => {
      const last = r.lastSeen.slice(0, 5);
      const lastValues = last.map((item) => {
        return r.months[item.month].days[item.day].counter;
      });
      const minLastSeenValue = Math.min.apply(null, lastValues);
      const maxLastSeenValue = Math.max.apply(null, lastValues);
      return last.map((item) => {
        return {
          chValue: convertRange(
            r.months[item.month].days[item.day].counter,
            minLastSeenValue,
            maxLastSeenValue,
            100, // TODO Extract hardcoded values
            200,
          ),
          value: convertRange(
            r.months[item.month].days[item.day].counter,
            minLastSeenValue,
            maxLastSeenValue,
            5000, // TODO Extract hardcoded values
            5300,
          ),
          dayNum: dayMonthToDayNum(item.day, item.month - 1),
        };
      });
      // r.lastSeen.slice(0, 5).map((item) => {
      //   return {
      //     chValue: convertRange(
      //       r.months[item.month].days[item.day].counter,
      //       r.shame[0].counter,
      //       r.top[0].counter,
      //       100,
      //       200,
      //     ),
      //     value: convertRange(
      //       r.months[item.month].days[item.day].counter,
      //       r.shame[0].counter,
      //       r.top[0].counter,
      //       5000,
      //       5300,
      //     ),
      //     dayNum: dayMonthToDayNum(item.day, item.month - 1),
      //   };
      // })
    })(),
    dayInMonth: r.days.map((item) => {
      return {
        dayNumAtMonth: item.day, // 0-30 not (0-365)
        // valuesAtMonthNum: Array.apply(null, Array(12)).map((_, monthIndex) => {
        //   const dayData = r.months[monthIndex + 1].days[item.day];
        //   if (typeof dayData !== 'undefined') {
        //     return dayData.counter;
        //   } else {
        //     return 0;
        //   }
        // }),
        value: item.sum,
      };
    }),
    dayInYear: r.launch.map((item) => {
      return {
        dayNum: item.day_of_year - 1,
        value: item.counter,
      };
    }).sort((a, b) => a.dayNum - b.dayNum),
    around: {
      today: {
        value: r.months[r.rand_date.month].days[r.rand_date.day].counter,
        dayNum: dateToDayNum(lastGenerateDate),
      },
      yesterday: {
        value: r.months[lastGenerateDateYesterday.getMonth() + 1].days[lastGenerateDateYesterday.getDate()].counter,
        dayNum: dateToDayNum(lastGenerateDateYesterday),
      },
      tomorrow: {
        value: r.months[lastGenerateDateTomorrow.getMonth() + 1].days[lastGenerateDateTomorrow.getDate()].counter,
        dayNum: dateToDayNum(lastGenerateDateTomorrow),
      },
    },
    seasons: {
      winter: r.months[12].sum + r.months[1].sum + r.months[2].sum,
      spring: r.months[3].sum + r.months[4].sum + r.months[5].sum,
      summer: r.months[6].sum + r.months[7].sum + r.months[8].sum,
      autumn: r.months[9].sum + r.months[10].sum + r.months[11].sum,
    },
    halfYear: {
      first: [1, 2, 3, 4, 5, 6].reduce((sum, month) => sum + r.months[month].sum, 0),
      second: [7, 8, 9, 10, 11, 12].reduce((sum, month) => sum + r.months[month].sum, 0),
    },
    tower: (() => {
      const {tvTower} = r;
      const values = Object.keys(tvTower);
      const min = Math.min.apply(null, values);
      const max = Math.max.apply(null, values);
      const finalData = [];
      for (let value = max; value >= min; value--) {
        const data = tvTower[value];
        if (data) {
          const dayNums = data.date.split(',').map((date) => {
            const [day, month] = date.split('-');
            return dayMonthToDayNum(parseInt(day), parseInt(month) - 1);
          });
          finalData.push({
            dayNums,
            value: parseInt(value),
            isPrimeValue: !!data.is_prime,
          });
        }
        else {
          finalData.push({
            dayNums: [],
            value: parseInt(value),
            isPrimeValue: isPrimeNumber(value),
          });
        }
      }
      return finalData;
    })(),
    months: Object.keys(r.months).map((month) => {
      return {
        dayNum: dayMonthToDayNum(1, parseInt(month) - 1),
        value: r.months[month].sum,
      }
    }),
    monthsDay: Object.keys(r.months).map((month) => {
      const dayData = r.months[month].days[r.rand_date.day];
      return {
        date: new Date(NOW.getFullYear(), parseInt(month) - 1, 1),
        dayNum: dayMonthToDayNum(1, parseInt(month) - 1),
        value: dayData ? dayData.counter : 0,
      }
    }),
  };

  return stat;
};

export default apiResponseMapper;
