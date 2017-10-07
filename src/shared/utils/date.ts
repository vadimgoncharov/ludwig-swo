import {getRandomInt} from './random';
import {convertColor} from './math';
import * as c from 'shared/constants';

const DATE_NOW: Date = new Date();
const DAY_IN_MS = 3600 * 24 * 1000;
const MONTHS_NOMINATIVE: string[] = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

const MONTHS_ACCUSATIVE: string[] = [
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

const MONTHS_PREPOSITIONAL: string[] = [
  'январе',
  'феврале',
  'марте',
  'апреле',
  'мае',
  'июне',
  'июле',
  'августе',
  'сентябре',
  'октябре',
  'ноябре',
  'декабре',
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

const MONTHS_WINTER = [11, 0, 1]; // dec, jan, feb
const MONTHS_SPRING = [2, 3, 4]; // mar, apr, may
const MONTHS_SUMMER = [5, 6, 7]; // jun, jul, aug
const MONTHS_AUTUMN = [8, 9, 10]; // sep, oct, nov
const SEASON_NAME_WINTER = 'winter';
const SEASON_NAME_SPRING = 'spring';
const SEASON_NAME_SUMMER = 'summer';
const SEASON_NAME_AUTUMN = 'autumn';

const DAYS_WORDS_ABBRS: string[] = DAYS_WORDS.map((word) => {
  return word.split(' ').map((w) => w[0]).join('');
});

const DAYS_COUNT_IN_YEAR_CACHE = {};
const DAY_NUMBER_IN_YEAR_CACHE = {};
const DAY_NUMBER_IN_YEAR_CACHE_REVERSE: {[key: number]: Date} = {};
const DAYS_IN_YEAR_AS_DATES_CACHE: Date[] = [];

function addLeadingZero(value: number|string): string {
  const numberValue: number = +value;

  if (numberValue < 10) {
    return `0${numberValue}`;
  }

  return `${value}`;
}


function getYearFirstDayDate(): Date {
  return new Date(DATE_NOW.getFullYear(), 0, 1);
}

function getYearLastDayDate(): Date {
  return new Date(DATE_NOW.getFullYear(), 11, 31);
}

function getRandomDate(): Date {
  return new Date(DATE_NOW.getFullYear(), getRandomInt(0, 11), getRandomInt(1, 31));
}

function getDaysCountInYear(year: number): number {
  if (!DAYS_COUNT_IN_YEAR_CACHE[year]) {
    let days: number = 0;
    for (let month = 1; month <= 12; month++) {
      days += (new Date(year, month, 0).getDate());
    }
    DAYS_COUNT_IN_YEAR_CACHE[year] = days;
  }
  return DAYS_COUNT_IN_YEAR_CACHE[year];
}

function getDayNumberInYear(year: number, month: number, day: number): number {
  const key = `${month}-${day}`;
  if (!DAY_NUMBER_IN_YEAR_CACHE[key]) {
    const end: Date = new Date(year, month, day);
    const start: Date = new Date(end.getFullYear(), 0, 0);
    const diff: number = end.getTime() - start.getTime();
    const oneDay: number = 1000 * 60 * 60 * 24;
    const dayInYear: number = Math.floor(diff / oneDay);

    DAY_NUMBER_IN_YEAR_CACHE[key] = dayInYear;
    DAY_NUMBER_IN_YEAR_CACHE_REVERSE[dayInYear] = new Date(year, month, day);
  }
  return DAY_NUMBER_IN_YEAR_CACHE[key];
}

function getDayNumberInYearByDate(date: Date): number {
  return getDayNumberInYear(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDateByDayNumberInYear(dayNumber: number): Date {
  const d = DAY_NUMBER_IN_YEAR_CACHE_REVERSE[dayNumber];
  if (!d) {
    // FIXME we should always return cached value not `new Date()`
    return new Date();
  };
  return d;
}

function dateToDayMonth(date: Date, months: string[]): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = months[month];

  return `${day} ${monthStr}`;
}

function dateToDayMonthAccusative(date: Date): string {
  return dateToDayMonth(date, MONTHS_ACCUSATIVE);
}

function dateToDayMonthPrepositional(date: Date): string {
  return dateToDayMonth(date, MONTHS_PREPOSITIONAL);
}

function dateToMonthPrepositional(date: Date): string {
  return MONTHS_PREPOSITIONAL[date.getMonth()];
}

function dateToMonthNominative(date: Date): string {
  return MONTHS_NOMINATIVE[date.getMonth()];
}

function dateToDayMonthAbbr(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = MONTHS_ACCUSATIVE[month];

  const monthFirstLetter = monthStr[0];
  const dayFirstLetter = DAYS_WORDS_ABBRS[day - 1];

  return `${dayFirstLetter}${monthFirstLetter}`.toUpperCase();
}

function dateToDayMonthWords(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = MONTHS_ACCUSATIVE[month];

  const dayFirstLetter = DAYS_WORDS[day - 1];

  return `${dayFirstLetter} ${monthStr}`;
}

function dateToYYYYMMDD(date: Date): string {
  const day: string = addLeadingZero(date.getDate());
  const month: string = addLeadingZero(date.getMonth() + 1);
  const year: number = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function dateToDMMYYYY(date: Date): string {
  const day: number = date.getDate();
  const month: string = addLeadingZero(date.getMonth() + 1);
  const year: number = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function dateToDDMM(date: Date, delimiter: string = '.'): string {
  const day: string = addLeadingZero(date.getDate());
  const month: string = addLeadingZero(date.getMonth() + 1);
  return `${day}${delimiter}${month}`;
}

function dateToMonthStr(date: Date): string {
  const month: number = date.getMonth();
  return MONTHS_ACCUSATIVE[month];
}

function getDaysInYearAsDates(): Date[] {
  if (DAYS_IN_YEAR_AS_DATES_CACHE.length > 0) {
    return DAYS_IN_YEAR_AS_DATES_CACHE;
  }

  const yearFirstDay: Date = new Date(DATE_NOW.getFullYear(), 0, 1);
  const nextYear: number = DATE_NOW.getFullYear() + 1;
  let cursor = new Date(yearFirstDay.getTime());

  let wasReachedLastDayOfTheYear = false;

  while (!wasReachedLastDayOfTheYear) {
    const date = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate());
    DAYS_IN_YEAR_AS_DATES_CACHE.push(date);
    cursor = new Date(cursor.getTime() + DAY_IN_MS);
    if (cursor.getFullYear() >= nextYear) {
      wasReachedLastDayOfTheYear = true;
    }
  }

  return DAYS_IN_YEAR_AS_DATES_CACHE;
}

function getSeasonName(date: Date): string {
  const month = date.getMonth();
  if (MONTHS_WINTER.indexOf(month) !== -1) {
    return SEASON_NAME_WINTER;
  }
  if (MONTHS_SPRING.indexOf(month) !== -1) {
    return SEASON_NAME_SPRING;
  }
  if (MONTHS_SUMMER.indexOf(month) !== -1) {
    return SEASON_NAME_SUMMER;
  }
  if (MONTHS_AUTUMN.indexOf(month) !== -1) {
    return SEASON_NAME_AUTUMN;
  }
}

function dateToColor(date: Date): {bgColor: string, textColor: string} {
  const day = date.getDate();
  const month = date.getMonth();
  const daysInMonth = (() => {
    const d = new Date(date);
    d.setDate(0);
    return d.getDate();
  })();

  const {bg: bgStart, text} = c.monthColors[month];
  const {bg: bgEnd} = c.monthColors[(month + 1) % c.monthColors.length];

  const bgColor = convertColor(day, 1, daysInMonth, bgStart, bgEnd);
  return {
    bgColor,
    textColor: text,
  };
}



export {
  getRandomDate,
  getDaysCountInYear,
  getDayNumberInYear,
  getDayNumberInYearByDate,
  getDateByDayNumberInYear,
  getDaysInYearAsDates,
  getYearFirstDayDate,
  getYearLastDayDate,
  getSeasonName,
  SEASON_NAME_WINTER,
  SEASON_NAME_SPRING,
  SEASON_NAME_SUMMER,
  SEASON_NAME_AUTUMN,
  dateToDayMonthAccusative,
  dateToDayMonthPrepositional,
  dateToMonthPrepositional,
  dateToMonthNominative,
  dateToMonthStr,
  dateToDayMonthAbbr,
  dateToDayMonthWords,
  dateToYYYYMMDD,
  dateToDMMYYYY,
  dateToDDMM,
  dateToColor,
};
