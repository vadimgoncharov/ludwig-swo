import {TThunkAction} from 'shared/types/ThunkAction';
import {TDispatch} from 'shared/types/Dispatch';
import {TChangeHeaderSwoDateVisibilityAction} from 'shared/types/UiAction';

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
