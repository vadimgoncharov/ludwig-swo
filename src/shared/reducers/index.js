// @flow

import {combineReducers} from 'redux';
import stats from './stats';
import type {Stats} from './stats';

export type StoreState = {|
  stats: Stats,
|};

const reducers = {
  stats: stats,
};

const combinedReducers = combineReducers(reducers);

export default combinedReducers;
