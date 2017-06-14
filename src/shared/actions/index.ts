import {getRandomDate} from 'shared/utils/date';
import {getRandomInt} from 'shared/utils/random';
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
    // Emulate real request
    return new Promise((resolve) => {
      setTimeout(() => {
        const json: TStats = {
          statTotal: {
            date: getRandomDate(),
            value: 2963000 + getRandomInt(1, 1000),
          },
          statPrevDates: [
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
            getRandomDate(),
          ],
          statMinMax: [
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(1, 2000),
            },
          ].sort((a, b) => {
            if (a.value > b.value) {
              return -1;
            } else if (a.value < b.value) {
              return 1;
            }
            return 0;
          }),
          statJdan: [
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(0, 1000),
              chValue: 100 + getRandomInt(0, 100),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(0, 1000),
              chValue: 100 + getRandomInt(0, 100),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(0, 1000),
              chValue: 100 + getRandomInt(0, 100),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(0, 1000),
              chValue: 100 + getRandomInt(0, 100),
            },
            {
              date: getRandomDate(),
              value: 7800 + getRandomInt(0, 1000),
              chValue: 100 + getRandomInt(0, 100),
            },
          ],
        };
        resolve(dispatch(_receiveStats(json)));
      }, 500);
    });
  };
}

export function fetchStats(): TThunkAction {
  return (dispatch: TDispatch) => {
    // Should return promise
    return dispatch(_fetchStats());
  };
}
