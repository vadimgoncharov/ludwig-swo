import {TDispatch} from './Dispatch';
import {TGetGlobalState} from './GetGlobalState';

export type TThunkAction = (dispatch: TDispatch, getState: TGetGlobalState) => any;
