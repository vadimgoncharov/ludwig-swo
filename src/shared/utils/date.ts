import {getRandomInt} from './random';

const DATE_NOW: Date = new Date();
const MONTHS: string[] = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const DAYS_WORDS: string[] = [
  'первое',
  'второе',
  'третье',
  'четвертое',
  'пятое',
  'шестое',
  'седьмое',
  'восьмое',
  'девятое',
  'десятое',
  'одиннадцатое',
  'двенадцатое',
  'тринадцатое',
  'четырнадцатое',
  'пятнадцатое',
  'шестандцатое',
  'семнадцатое',
  'восемнадцатое',
  'девятнадцатое',
  'двадцатое',
  'двадцать первое',
  'двадцать второе',
  'двадцать третье',
  'двадцать четвертое',
  'двадцать пятое',
  'двадцать шестое',
  'двадцать седьмое',
  'двадцать восьмое',
  'двадцать девятое',
  'тридцатое',
  'тридцать первое',
];

const DAYS_WORDS_ABBRS: string[] = DAYS_WORDS.map((word) => {
  return word.split(' ').map((w) => w[0]).join('');
});

function addLeadingZeroToMonth(value: number|string): string {
  const numberValue: number = +value;

  if (numberValue < 10) {
    return `0${numberValue}`;
  }

  return `${value}`;
}

function getDateByMD(month: number, day: number): Date {
  return new Date(DATE_NOW.getFullYear(), month - 1, day);
}

function getRandomDate(): Date {
  return new Date(DATE_NOW.getFullYear(), getRandomInt(0, 11), getRandomInt(1, 31));
}

const daysInYearsCache = {};
function getDaysInYear(year: number): number {
  if (!daysInYearsCache[year]) {
    let days: number = 0;
    for (let month = 1; month <= 12; month++) {
      days += (new Date(year, month, 0).getDate());
    }
    daysInYearsCache[year] = days;
  }
  return daysInYearsCache[year];
}

const dayInYearCache = {};
function getDayInYear(year: number, month: number, day: number): number {
  const key = `${year}-${month}-${day}`;
  if (!dayInYearCache[key]) {
    const end: Date = new Date(year, month, day);
    const start: Date = new Date(end.getFullYear(), 0, 0);
    const diff: number = end.getTime() - start.getTime();
    const oneDay: number = 1000 * 60 * 60 * 24;
    const dayInYear: number = Math.floor(diff / oneDay);

    dayInYearCache[key] = dayInYear;
  }
  return dayInYearCache[key];
}

function dateToDayMonth(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = MONTHS[month];

  return `${day} ${monthStr}`;
}

function dateToDayMonthAbbr(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = MONTHS[month];

  const monthFirstLetter = monthStr[0];
  const dayFirstLetter = DAYS_WORDS_ABBRS[day - 1];

  return `${dayFirstLetter}${monthFirstLetter}`.toUpperCase();
}


function dateToYYYYMMDD(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();
  return `${year}-${month}-${addLeadingZeroToMonth(day)}`;
}

function dateToMonthStr(date: Date): string {
  const month: number = date.getMonth();
  return MONTHS[month];
}

export {
  getDateByMD,
  getRandomDate,
  getDaysInYear,
  getDayInYear,
  dateToDayMonth,
  dateToMonthStr,
  dateToDayMonthAbbr,
  dateToYYYYMMDD,
};
