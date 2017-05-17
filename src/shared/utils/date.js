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

function dateToDayMonth(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = monthes[month];

  return `${day} ${monthStr}`;
}

export {
  getDateByMD,
  getRandomDate,
  dateToDayMonth,
};
