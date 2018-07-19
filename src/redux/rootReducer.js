import { combineReducers } from 'redux'

import map from './modules/main/main'

export const rootReducers = combineReducers({
  map: map.reducers,
});

export const rootActions = Object.assign(
  {},
  map.actions,
);