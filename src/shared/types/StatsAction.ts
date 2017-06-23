import {TStats} from './Stats';

export type TRequestStatsAction = {
  type: 'REQUEST_STATS',
};

export type TReceiveStatsAction = {
  type: 'RECEIVE_STATS',
  data: TStats,
};

export type TRequestStatsPreAction = {
  type: 'REQUEST_STATS_PRE',
};

export type TReceiveStatsPreAction = {
  type: 'RECEIVE_STATS_PRE',
  data: TStats,
};

export type TStatsAction = TRequestStatsAction
  | TReceiveStatsAction
  | TRequestStatsPreAction
  | TReceiveStatsPreAction;
