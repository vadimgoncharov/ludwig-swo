import {TStatTotal} from './StatTotal';
import {TStatPrevDates} from './StatPrevDates';
import {TStatMinMax} from './StatMinMax';
import {TStatJdan} from './StatJdan';
import {TStatTotalEvenOdd} from './StatTotalEvenOdd';
import {TStatDayInMonth} from './StatDayInMonth';
import {TStatDayInYear} from './StatDayInYear';
import {TStatAround} from './StatAround';
import {TStatSeasons} from './StatSeasons';
import {TStatHalfYear} from './StatHalfYear';
import {TStatLastGeneratedDate} from './StatLastGeneratedDate';
import {TStatTower} from './StatTower';

export type TStats = {
  statTotal: TStatTotal,
  statTotalEvenOdd: TStatTotalEvenOdd,
  statPrevDates: TStatPrevDates,
  statMinMax: TStatMinMax,
  statJdan: TStatJdan,
  statDayInMonth: TStatDayInMonth,
  statDayInYear: TStatDayInYear,
  statAround: TStatAround,
  statSeasons: TStatSeasons,
  statHalfYear: TStatHalfYear,
  statLastGeneratedDate: TStatLastGeneratedDate,
  statTower: TStatTower,
};
