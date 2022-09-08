import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { commerce } from '../lib/commerce';

interface CheckoutTokenState {
  token: CheckoutToken;
  loading: boolean;
  error: string;
}

export const fetchCheckoutToken = createAsyncThunk(
  'checkout/fetchCheckoutTokenStatus',
  async ({ cartId, type }: { cartId: string; type: string }, thunkAPI) => {
    try {
      const token = await commerce.checkout.generateToken(cartId, {
        type: type,
      });
      console.log(token);
      return token;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error while create checkout token from commerce',
      );
    }
  },
);

const initialState: CheckoutTokenState = {
  token: {} as CheckoutToken,
  loading: false,
  error: '',
};

export const CheckoutTokenSlice = createSlice({
  name: 'CheckoutToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckoutToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCheckoutToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(fetchCheckoutToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = CheckoutTokenSlice.actions;
export default CheckoutTokenSlice.reducer;
