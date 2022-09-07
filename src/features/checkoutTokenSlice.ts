import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { commerce } from '../lib/commerce';

interface CheckoutTokenState {
  token: CheckoutToken;
  loading: boolean;
  error: string;
}

const initialState: CheckoutTokenState = {
  token: {} as CheckoutToken,
  loading: false,
  error: '',
};

export const CheckoutTokenSlice = createSlice({
  name: 'CheckoutToken',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = CheckoutTokenSlice.actions;
export default CheckoutTokenSlice.reducer;
