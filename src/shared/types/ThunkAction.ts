import {TDispatch} from './Dispatch';
import {TGlobalState} from './GlobalState';

type TGetGlobalState = () => TGlobalState;

export type TThunkAction = (dispatch: TDispatch, getState: TGetGlobalState) => any;
