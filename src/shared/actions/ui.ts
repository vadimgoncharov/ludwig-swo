import {TThunkAction} from 'shared/types/ThunkAction';
import {TDispatch} from 'shared/types/Dispatch';
import {
  TAddNavHashAction,
  TChangeHeaderSwoDateVisibilityAction,
  TRemoveNavHashAction,
} from 'shared/types/UiAction';

export const CHANGE_HEADER_SWO_STATE_ACTION: 'CHANGE_HEADER_SWO_STATE_ACTION' = 'CHANGE_HEADER_SWO_STATE_ACTION';
function _changeHeaderSwoDateVisibility(isVisible: boolean): TChangeHeaderSwoDateVisibilityAction {
  return {
    type: CHANGE_HEADER_SWO_STATE_ACTION,
    data: {
      header: {
        isSwoDateVisible: isVisible,
      },
    },
  };
}

export function changeHeaderSwoDateVisibility(isVisible: boolean): TThunkAction {
  return (dispatch: TDispatch) => {
    // Should return promise
    return dispatch(_changeHeaderSwoDateVisibility(isVisible));
  };
}

export const ADD_NAV_HASH_ACTION: 'ADD_NAV_HASH_ACTION' = 'ADD_NAV_HASH_ACTION';
export const REMOVE_NAV_HASH_ACTION: 'REMOVE_NAV_HASH_ACTION' = 'REMOVE_NAV_HASH_ACTION';
function _addNavHashAction(navHash: string): TAddNavHashAction {
  return {
    type: ADD_NAV_HASH_ACTION,
    data: {
      nav: {
        selectedHashes: {[navHash]: true},
      },
    },
  };
}
function _removeNavHashAction(navHash: string): TRemoveNavHashAction {
  return {
    type: REMOVE_NAV_HASH_ACTION,
    data: {
      nav: {
        selectedHashes: {[navHash]: true},
      },
    },
  };
}

export function addNavHashAction(navHash: string): TThunkAction {
  return (dispatch: TDispatch) => {
    // Should return promise
    return dispatch(_addNavHashAction(navHash));
  };
}

export function removeNavHashAction(navHash: string): TThunkAction {
  return (dispatch: TDispatch) => {
    // Should return promise
    return dispatch(_removeNavHashAction(navHash));
  };
}
