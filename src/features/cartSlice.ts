import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@chec/commerce.js/types/cart';

interface CartState {
  books: Cart;
  loading: boolean;
  error: string;
}

const initialState: CartState = {
  books: {} as Cart,
  loading: false,
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
