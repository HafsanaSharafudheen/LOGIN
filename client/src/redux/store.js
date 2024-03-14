import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import userReducer from '/src/redux/user/userSlice.js';

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
  key: 'user',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
 
});
export const persistor = persistStore(store);
