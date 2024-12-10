import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './features/itemSlice';

export const store = configureStore({
  reducer: {
    items: itemReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;