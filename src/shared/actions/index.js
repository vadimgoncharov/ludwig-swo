// @flow

import {getRandomDate} from 'shared/utils/date';
import {getRandomInt} from 'shared/utils/random';
import type {StatsData} from 'shared/reducers/stats';

export const REQUEST_STATS = 'REQUEST_STATS';
function _requestStat() {
  return {
    type: REQUEST_STATS,
  };
}

export const RECEIVE_STATS = 'RECEIVE_STATS';
function _receiveStats(json) {
  return {
    type: RECEIVE_STATS,
    data: json,
  };
}

function _fetchStats() {
  return dispatch => {
    dispatch(_requestStat());
    // Emulate real request
    return new Promise((resolve) => {
      setTimeout(() => {
        const json: StatsData = {
          statTotal: {
            date: getRandomDate(),
            value: 2963000 + getRandomInt(1, 1000),
          }
        };
        resolve(dispatch(_receiveStats(json)));
      }, 500);
    });
  };
}

export function fetchStats() {
  return (dispatch, /*getState*/) => {
    // Should return promise
    return dispatch(_fetchStats());
  };
}
