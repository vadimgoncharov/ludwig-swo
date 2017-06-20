import {TAction} from './Action';
import {TThunkAction} from './ThunkAction';

type TPromiseAction = Promise<TAction>;

export type TDispatch = (action: TAction | TThunkAction | TPromiseAction) => any;
