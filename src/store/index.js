import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './persistSlices/authSlice';
import defaultReducers from './defaultSlices';
import persistedReducer from './persistSlices';

const store = configureStore({
  reducer: {
    persist: persistedReducer,
    default: defaultReducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
