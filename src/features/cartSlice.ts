import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Cart } from '@chec/commerce.js/types/cart';
import { commerce } from '../lib/commerce';

export const fetchCart = createAsyncThunk(
  'cart/fetchCartStatus',
  async (_, thunkAPI) => {
    try {
      const cart = await commerce.cart.retrieve();
      console.log(cart);
      return cart;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error when fetched cart from commerce',
      );
    }
  },
);

export const addBookToCart = createAsyncThunk(
  'cart/addBookToCartStatus',
  async (params: { id: string; quantity: number }, thunkAPI) => {
    try {
      const { cart } = await commerce.cart.add(params.id, params.quantity);
      return cart;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error when added book to cart from commerce',
      );
    }
  },
);

export const emptyCart = createAsyncThunk(
  'cart/emptyCartStatus',
  async (params, thunkAPI) => {
    try {
      const { cart } = await commerce.cart.empty();
      return cart;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error when made cart empty from commerce',
      );
    }
  },
);

interface CartState {
  cart: Cart;
  loading: boolean;
  error: string;
}

const initialState: CartState = {
  cart: {} as Cart,
  loading: false,
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      console.log('add');
    });
    builder.addCase(addBookToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(emptyCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;
