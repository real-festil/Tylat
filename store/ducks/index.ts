import { combineReducers } from 'redux';

import * as auth from './auth';

export const reducer = combineReducers({
  auth: auth.reducer,
});

export const actions = {
  auth: auth.actions,
};
