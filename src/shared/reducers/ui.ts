import {
  CHANGE_HEADER_SWO_STATE_ACTION,
} from '../actions/ui';

import {TUiState} from 'shared/types/UiState';
import {TUiAction} from 'shared/types/UiAction';

const INITIAL_STATE: TUiState = {
  data: {
    header: {
      // It's false because we show swoDate at Hero,
      // so no need to show it on Header
      isSwoDateVisible: false,
    },
  },
};

// TODO fix action: any
function ui(state: TUiState = INITIAL_STATE, action: any): TUiState {
  switch (action.type) {
    case CHANGE_HEADER_SWO_STATE_ACTION:
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

export default ui;
