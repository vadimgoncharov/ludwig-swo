import {combineReducers} from 'redux';
import stats from './stats';
import ui from './ui';

const reducers = {
  stats,
  ui,
};

const combinedReducers = combineReducers(reducers);

export default combinedReducers;
