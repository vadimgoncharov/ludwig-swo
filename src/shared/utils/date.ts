import {convertColor} from './math';
import {addLeadingZero} from './format';
import {
  dayNumMapping as DAY_NUMS,
  monthColors as MONTH_COLORS,
} from 'shared/constants';
import {
  MONTHS_NOMINATIVE,
  MONTHS_ACCUSATIVE,
  MONTHS_PREPOSITIONAL,
  DAYS_WORDS_ABBRS,
} from 'shared/constants/dateStrings';
import {
  SEASON_NAME_WINTER,
  SEASON_NAME_SPRING,
  SEASON_NAME_SUMMER,
  SEASON_NAME_AUTUMN,

  MONTHS_WINTER,
  MONTHS_SPRING,
  MONTHS_SUMMER,
  MONTHS_AUTUMN,
} from 'shared/constants/seasons';

import {TDayNum} from 'shared/types/DayNum';

function dateToDayMonthAbbr(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth();
  const monthStr: string = MONTHS_ACCUSATIVE[month];

  const monthFirstLetter = monthStr[0];
  const dayFirstLetter = DAYS_WORDS_ABBRS[day - 1];

  return `${dayFirstLetter}${monthFirstLetter}`.toUpperCase();
}

function dateToYYYYMMDD(date: Date): string {
  const day: string = addLeadingZero(date.getDate());
  const month: string = addLeadingZero(date.getMonth() + 1);
  const year: number = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function dateToDayMonthYearAccusative(date: Date): string {
  const day: string = date.getDate().toString();
  const month: string = MONTHS_ACCUSATIVE[date.getMonth()];
  const year: number = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function dateToDMMYYYY(date: Date): string {
  const day: number = date.getDate();
  const month: string = addLeadingZero(date.getMonth() + 1);
  const year: number = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function dayNumToColor(dayNum: number): {bgColor: string, textColor: string} {
  const {day, month} = DAY_NUMS.dayNumToDateData[dayNum];
  const daysInMonth = DAY_NUMS.monthToDaysInMonth[month];

  const {bg: bgStart, text} = MONTH_COLORS[month];
  const {bg: bgEnd} = MONTH_COLORS[(month + 1) % MONTH_COLORS.length];

  const bgColor = convertColor(day, 1, daysInMonth, bgStart, bgEnd);
  return {
    bgColor,
    textColor: text,
  };
}

function dateToDayNum(date: Date): TDayNum {
  const day = date.getDate();
  const month = date.getMonth();
  const key = `${month}-${day}`;
  return DAY_NUMS.dateStrToDayNum[key];
}

function dayNumToData(dayNum: number): {day: number, month: number} {
  if (typeof DAY_NUMS.dayNumToDateData[dayNum] === 'undefined') {
    console.error(`dayNumToData error: invalid index "${dayNum}"`);
    return DAY_NUMS.dayNumToDateData[0];
  } else {
    return DAY_NUMS.dayNumToDateData[dayNum];
  }
}

function dayMonthToDayNum(day: number, month: number): TDayNum {
  const key = `${month}-${day}`;
  return DAY_NUMS.dateStrToDayNum[key];
}

function dayNumToDayMonth(dayNum: number, months: string[]): string {
  const {day, month} = DAY_NUMS.dayNumToDateData[dayNum];
  const monthStr: string = months[month];

  return `${day} ${monthStr}`;
}

function dayMonthToDayMonth(day: number, month: number, months: string[]): string {
  const monthStr: string = months[month];

  return `${day} ${monthStr}`;
}

function monthToMonth(month: number, months: string[]): string {
  return months[month];
}

function dayNumToMonth(dayNum: number, months: string[]): string {
  const {month} = DAY_NUMS.dayNumToDateData[dayNum];
  return months[month];
}

function dayNumToDayMonthAccusative(dayNum: number): string {
  return dayNumToDayMonth(dayNum, MONTHS_ACCUSATIVE);
}

function dayMonthToDayMonthAccusative(day: number, month: number): string {
  return dayMonthToDayMonth(day, month, MONTHS_ACCUSATIVE);
}

function monthToMonthPrepositional(month: number): string {
  return monthToMonth(month, MONTHS_PREPOSITIONAL);
}

function dayNumToMonthPrepositional(dayNum: number): string {
  const {month} = DAY_NUMS.dayNumToDateData[dayNum];
  return MONTHS_PREPOSITIONAL[month];
}

function dayNumToMonthNominative(dayNum: number): string {
  const {month} = DAY_NUMS.dayNumToDateData[dayNum];
  return MONTHS_NOMINATIVE[month];
}

function dayNumToMonthAccusative(dayNum: number): string {
  return dayNumToMonth(dayNum, MONTHS_ACCUSATIVE);
}

function dayNumToDayMonthAbbr(dayNum: number): string {
  const {day, month} = DAY_NUMS.dayNumToDateData[dayNum];
  const monthStr: string = MONTHS_ACCUSATIVE[month];

  const monthFirstLetter = monthStr[0];
  const dayFirstLetter = DAYS_WORDS_ABBRS[day - 1];

  return `${dayFirstLetter}${monthFirstLetter}`.toUpperCase();
}

function dayNumToDDMM(dayNum: number, delimiter: string = '.'): string {
  const {day, month} = DAY_NUMS.dayNumToDateData[dayNum];
  const dayFinal: string = addLeadingZero(day);
  const monthFinal: string = addLeadingZero(month + 1);
  return `${dayFinal}${delimiter}${monthFinal}`;
}


function dayNumToSeasonKey(dayNum: number): string {
  const {month} = DAY_NUMS.dayNumToDateData[dayNum];
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

function seasonKeyToColor(seasonKey: string): {bg: string, text: string} {
  // TODO replace hardcoded values
  switch (seasonKey) {
    case SEASON_NAME_WINTER:
      // return MONTH_COLORS[1];
      // range value = 53
      return {bg: '#618eed', text: '#ffffff'};
    case SEASON_NAME_SPRING:
      // return MONTH_COLORS[3];
      // range value = 67
      return {bg: '#48d50e', text: '#ffffff'};
    case SEASON_NAME_SUMMER:
      // return MONTH_COLORS[7];
      // range value = 13
      return {bg: '#f0aa0a', text: '#ffffff'};
    case SEASON_NAME_AUTUMN:
      // return MONTH_COLORS[9];
      // range value = 1
      return {bg: '#b3b750', text: '#ffffff'};
  }
}

export {
  SEASON_NAME_WINTER,
  SEASON_NAME_SPRING,
  SEASON_NAME_SUMMER,
  SEASON_NAME_AUTUMN,
  dateToDayMonthAbbr,
  dateToYYYYMMDD,
  dateToDMMYYYY,
  dateToDayNum,
  dateToDayMonthYearAccusative,
  dayMonthToDayNum,
  dayNumToDayMonthAccusative,
  dayNumToMonthAccusative,
  dayNumToMonthNominative,
  dayNumToMonthPrepositional,
  dayNumToData,
  dayNumToColor,
  dayNumToDayMonthAbbr,
  dayNumToDDMM,
  dayNumToSeasonKey,
  dayMonthToDayMonthAccusative,
  monthToMonthPrepositional,
  seasonKeyToColor,
};
