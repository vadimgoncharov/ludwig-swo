import {TStats} from './Stats';

export type TRequestStatsAction = {
  type: 'REQUEST_STATS',
};

export type TReceiveStatsAction = {
  type: 'RECEIVE_STATS',
  data: TStats,
};

export type TStatsAction = TRequestStatsAction | TReceiveStatsAction;
