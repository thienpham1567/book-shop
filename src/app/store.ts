import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
  reducer: {
    booksReducer,
    cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
