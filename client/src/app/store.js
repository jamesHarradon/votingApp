import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { emptySplitApi } from '../services/emptySplitApi';

//see if this works if not, use below
//const appReducer = {[emptySplitApi.reducerPath]: emptySplitApi.reducer}

const appReducer = combineReducers({
  [emptySplitApi.reducerPath]: emptySplitApi.reducer
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined
  }

  return appReducer(state, action);
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

//using persist allows redux to keep state after a page refresh
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(emptySplitApi.middleware)
});