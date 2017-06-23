import * as mockData from 'shared/services/mockData';

import {
  ACTION_REQUEST_STATS,
  ACTION_RECEIVE_STATS,
  ACTION_RECEIVE_STATS_PRE,
  ACTION_REQUEST_STATS_PRE,
} from '../actions/stats';

import {TStatsState} from '../types/StatsState';
import {TStatsAction} from '../types/StatsAction';

const INITIAL_STATE: TStatsState = {
  isFetching: false,
  dataPre: mockData.getAllStatsData(),
  data: mockData.getAllStatsData(),
};

function stats(state: TStatsState = INITIAL_STATE, action: TStatsAction): TStatsState {
  switch (action.type) {
    case ACTION_REQUEST_STATS_PRE:
      return {
        ...state,
        ...{
          isFetching: true,
        },
      };

    case ACTION_RECEIVE_STATS_PRE:
      return {
        ...state,
        ...{
          isFetching: false,
          dataPre: {...action.data},
        },
      };
    case ACTION_REQUEST_STATS:
      return {
        ...state,
      };

    case ACTION_RECEIVE_STATS:
      return {
        ...state,
        ...{
          data: {...action.data},
        },
      };

    default:
      return state;
  }
}

export default stats;
