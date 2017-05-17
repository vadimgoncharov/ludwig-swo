// @flow

import {getDateByMD} from 'shared/utils/date';

import {
  REQUEST_STATS,
  RECEIVE_STATS,
} from '../actions';

type StatValueDate = {
  value: number,
  date: Date,
};

export type StatTotal = StatValueDate;
export type StatPrevDates = Date[];
export type StatMinMax = StatValueDate[];
export type StatJdan = StatValueDate[];
export type StatsData = {|
  statTotal: StatTotal,
  statPrevDates: StatPrevDates,
  statMinMax: StatMinMax,
  statJdan: StatJdan,
|};

export type Stats = {|
  isFetching: boolean,
  data: StatsData,
|};

const INITIAL_STATE: Stats = {
  isFetching: false,
  data: {
    statTotal: {
      date: getDateByMD(9, 7),
      value: 2963000,
    },
    statPrevDates: [
      getDateByMD(8, 25),
      getDateByMD(8, 3),
      getDateByMD(5, 30),
      getDateByMD(5, 22),
      getDateByMD(4, 15),
      getDateByMD(4, 12),
      getDateByMD(3, 26),
      getDateByMD(3, 25),
      getDateByMD(3, 1),
      getDateByMD(2, 6),
    ],
    statMinMax: [
      {
        date: getDateByMD(10, 18),
        value: 8328,
      },
      {
        date: getDateByMD(9, 2),
        value: 8301,
      },
      {
        date: getDateByMD(5, 25),
        value: 8205,
      },
      {
        date: getDateByMD(6, 13),
        value: 8199,
      },
      {
        date: getDateByMD(5, 25),
        value: 7855,
      },
      {
        date: getDateByMD(12, 29),
        value: 7854,
      },
      {
        date: getDateByMD(7, 11),
        value: 7829,
      },
      {
        date: getDateByMD(12, 6),
        value: 7825,
      },
    ],
    statJdan: [
      {
        date: getDateByMD(12, 6),
        value: 7825,
        chValue: 122,
      },
      {
        date: getDateByMD(10, 18),
        value: 8327,
        chValue: 130,
      },
      {
        date: getDateByMD(1, 5),
        value: 7872,
        chValue: 122,
      },
      {
        date: getDateByMD(2, 25),
        value: 8298,
        chValue: 129,
      },
      {
        date: getDateByMD(12, 29),
        value: 7854,
        chValue: 122,
      },
    ]
  },
};

function stats(state: Stats = INITIAL_STATE, action: {type: string, data: any}) {
  switch (action.type) {
    case REQUEST_STATS:
      return {
        ...state,
        ...{
          isFetching: true,
        }
      };

    case RECEIVE_STATS:
      return {
        ...state,
        ...{
          isFetching: false,
          data: {...action.data},
        }
      };

    default:
      return state;
  }
}

export default stats;
