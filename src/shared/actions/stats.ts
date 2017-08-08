import * as API from 'shared/services/Api';

import {TStats} from 'shared/types/Stats';
import {TThunkAction} from 'shared/types/ThunkAction';
import {TDispatch} from 'shared/types/Dispatch';
import {TReceiveStatsAction, TRequestStatsAction} from 'shared/types/StatsAction';

export const ACTION_REQUEST_STATS: 'REQUEST_STATS' = 'REQUEST_STATS';
function _requestStat(): TRequestStatsAction {
  return {
    type: ACTION_REQUEST_STATS,
  };
}

export const ACTION_RECEIVE_STATS: 'RECEIVE_STATS' = 'RECEIVE_STATS';
function _receiveStats(json: TStats): TReceiveStatsAction {
  return {
    type: ACTION_RECEIVE_STATS,
    data: json,
  };
}

function _fetchStats(): TThunkAction {
  return (dispatch: TDispatch) => {
    dispatch(_requestStat());
    API.getStats().then((data) => {
      dispatch(_receiveStats(data));
    }).catch((error) => {
      console.error(error);
    });
  };
}

export function fetchStats(): TThunkAction {
  return (dispatch: TDispatch) => {
    // Should return promise
    return dispatch(_fetchStats());
  };
}
