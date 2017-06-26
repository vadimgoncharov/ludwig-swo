import {TStatTotal} from './StatTotal';
import {TStatPrevDates} from './StatPrevDates';
import {TStatMinMax} from './StatMinMax';
import {TStatJdan} from './StatJdan';
import {TStatTotalEvenOdd} from './StatTotalEvenOdd';
import {TStatDayInMonth} from './StatDayInMonth';
import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TStatAround} from 'shared/types/StatAround';

export type TStats = {
  statTotal: TStatTotal,
  statTotalEvenOdd: TStatTotalEvenOdd,
  statPrevDates: TStatPrevDates,
  statMinMax: TStatMinMax,
  statJdan: TStatJdan,
  statDayInMonth: TStatDayInMonth,
  statDayInYear: TStatDayInYear,
  statAround: TStatAround,
};
