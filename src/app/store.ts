import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';
import cartReducer from '../features/cartSlice';
import checkoutTokenReducer from '../features/checkoutTokenSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
    checkoutToken: checkoutTokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
