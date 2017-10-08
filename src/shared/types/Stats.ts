import {TTotal} from './Total';
import {TPrevDates} from './PrevDates';
import {TMinMax} from './MinMax';
import {TJdan} from './Jdan';
import {TTotalEvenOdd} from './TotalEvenOdd';
import {TDayInMonth} from './DayInMonth';
import {TDayInYear} from './DayInYear';
import {TAround} from './Around';
import {TSeasons} from './Seasons';
import {THalfYear} from './HalfYear';
import {TLastGeneratedDate} from './LastGeneratedDate';
import {TTower} from './Tower';
import {TMonths} from './Months';
import {TMonthsDay} from './MonthsDay';

export type TStats = {
  total: TTotal,
  totalEvenOdd: TTotalEvenOdd,
  prevDates: TPrevDates,
  minMax: TMinMax,
  jdan: TJdan,
  dayInMonth: TDayInMonth,
  dayInYear: TDayInYear,
  around: TAround,
  seasons: TSeasons,
  halfYear: THalfYear,
  lastGeneratedDate: TLastGeneratedDate,
  tower: TTower,
  months: TMonths,
  monthsDay: TMonthsDay,
};
