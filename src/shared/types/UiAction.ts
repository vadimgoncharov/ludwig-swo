import {TUiHeader} from './UiHeader';
import {TUiNav} from './UiNav';

export type TChangeHeaderSwoDateVisibilityAction = {
  type: 'CHANGE_HEADER_SWO_STATE_ACTION',
  data: {
    header: TUiHeader,
  },
};

export type TAddNavHashAction = {
  type: 'ADD_NAV_HASH_ACTION',
  data: {
    nav: TUiNav,
  },
};

export type TRemoveNavHashAction = {
  type: 'REMOVE_NAV_HASH_ACTION',
  data: {
    nav: TUiNav,
  },
};

export type TUiAction = TChangeHeaderSwoDateVisibilityAction | TAddNavHashAction | TRemoveNavHashAction;
