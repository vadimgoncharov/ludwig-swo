// @flow

import {getRandomInt} from './random';

const dateNow: Date = new Date();
const monthes: string[] = [
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

function getDateByMD(month: number, day: number): Date {
  return new Date(dateNow.getFullYear(), month - 1, day);
}

function getRandomDate(): Date {
  return new Date(dateNow.getFullYear(), getRandomInt(0, 11), getRandomInt(1, 31));
}

const daysInYearsCache = {};
function getDaysInYear(year: number): number {
  if (!daysInYearsCache[year]) {
    let days: number = 0;
    for(let month = 1; month <= 12; month++) {
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
    const diff: number = end - start;
    const oneDay: number = 1000 * 60 * 60 * 24;
    const dayInYear: number = Math.floor(diff / oneDay);

    dayInYearCache[key] = dayInYear;
  }
  return dayInYearCache[key];
}

function dateToDayMonth(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = monthes[month];

  return `${day} ${monthStr}`;
}

function dateToMonthStr(date: Date): string {
  const month: number = date.getMonth();
  return monthes[month];
}

export {
  getDateByMD,
  getRandomDate,
  getDaysInYear,
  getDayInYear,
  dateToDayMonth,
  dateToMonthStr,
};
