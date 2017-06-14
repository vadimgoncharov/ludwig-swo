import {combineReducers} from 'redux';
import stats from './stats';

const reducers = {
  stats,
};

const combinedReducers = combineReducers(reducers);

export default combinedReducers;
