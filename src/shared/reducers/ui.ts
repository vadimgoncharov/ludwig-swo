import {
  CHANGE_HEADER_SWO_STATE_ACTION,
  ADD_NAV_HASH_ACTION,
  REMOVE_NAV_HASH_ACTION,
} from '../actions/ui';

import {TUiState} from 'shared/types/UiState';
import {TUiAction} from 'shared/types/UiAction';

const INITIAL_STATE: TUiState = {
  data: {
    nav: {
      selectedHashes: {},
    },
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
          data: {
            ...state.data,
            ...action.data,
          },
        },
      };

    case ADD_NAV_HASH_ACTION: {
      const currHashes = state.data.nav.selectedHashes;
      const hashesToAdd = action.data.nav.selectedHashes;
      const newHashes = {};
      Object.keys(currHashes).forEach((hash) => {
        newHashes[hash] = true;
      });
      Object.keys(hashesToAdd).forEach((hash) => {
        newHashes[hash] = true;
      });

      return {
        ...state,
        ...{
          data: {
            ...state.data,
            nav: {
              ...state.data.nav,
              selectedHashes: newHashes,
            },
          },
        },
      }
    }

    case REMOVE_NAV_HASH_ACTION: {
      const currHashes = state.data.nav.selectedHashes;
      const hashesToRemove = action.data.nav.selectedHashes;
      const newHashes = {};
      Object.keys(currHashes).forEach((hash) => {
        if (!hashesToRemove[hash]) {
          newHashes[hash] = true;
        }
      });
      return {
        ...state,
        ...{
          data: {
            ...state.data,
            nav: {
              ...state.data.nav,
              selectedHashes: newHashes,
            },
          },
        },
      }
    }

    default:
      return state;
  }
}

export default ui;
