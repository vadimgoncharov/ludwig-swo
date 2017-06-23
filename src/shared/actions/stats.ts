import * as API from 'shared/services/api';

import {TStats} from 'shared/types/Stats';
import {TThunkAction} from 'shared/types/ThunkAction';
import {TDispatch} from 'shared/types/Dispatch';
import {
  TReceiveStatsAction,
  TReceiveStatsPreAction,
  TRequestStatsAction,
  TRequestStatsPreAction,
} from 'shared/types/StatsAction';
import {TGetGlobalState} from 'shared/types/GetGlobalState';

export const ACTION_REQUEST_STATS: 'REQUEST_STATS' = 'REQUEST_STATS';
function _requestStats(): TRequestStatsAction {
  return {
    type: ACTION_REQUEST_STATS,
  };
}

export const ACTION_REQUEST_STATS_PRE: 'REQUEST_STATS_PRE' = 'REQUEST_STATS_PRE';
function _requestStatsPre(): TRequestStatsPreAction {
  return {
    type: ACTION_REQUEST_STATS_PRE,
  };
}

export const ACTION_RECEIVE_STATS: 'RECEIVE_STATS' = 'RECEIVE_STATS';
function _receiveStats(json: TStats): TReceiveStatsAction {
  return {
    type: ACTION_RECEIVE_STATS,
    data: json,
  };
}

export const ACTION_RECEIVE_STATS_PRE: 'RECEIVE_STATS_PRE' = 'RECEIVE_STATS_PRE';
function _receiveStatsPre(json: TStats): TReceiveStatsPreAction {
  return {
    type: ACTION_RECEIVE_STATS_PRE,
    data: json,
  };
}

function _fetchStatsPre(): TThunkAction {
  return (dispatch: TDispatch) => {
    dispatch(_requestStatsPre());
    API.getStats().then((data) => {
      dispatch(_receiveStatsPre(data));
    }).catch((error) => {
      console.error(error);
    });
  };
}

export function fetchStats(): TThunkAction {
  return (dispatch: TDispatch, getGlobalState: TGetGlobalState) => {
    // Should return promise
    return dispatch(_receiveStats(getGlobalState().stats.dataPre));
  };
}

export function fetchStatsPre(): TThunkAction {
  return (dispatch: TDispatch) => {
    // Should return promise
    return dispatch(_fetchStatsPre());
  };
}
