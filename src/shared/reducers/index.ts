import {combineReducers} from 'redux';
import stats from './stats';
import {Stats} from './stats';

export type StoreState = {
  stats: Stats,
};

const reducers = {
  stats,
};

const combinedReducers = combineReducers(reducers);

export default combinedReducers;
