/* eslint-disable no-underscore-dangle */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';

import { actions, reducer } from './ducks';

export { actions };

// tslint:disable:no-var-requires
const reduxModule = require(`redux`);

reduxModule.__DO_NOT_USE__ActionTypes.INIT = `@@redux/INIT`;
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = `@@redux/REPLACE`;

export type State = ReturnType<typeof reducer>;

// const persistConfig = {
//   key: `root`,
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer,
  devTools: true,
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});
