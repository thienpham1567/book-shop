import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@chec/commerce.js/types/cart';
import { commerce } from '../lib/commerce';

export const fetchCart = createAsyncThunk(
  'cart/fetchCartStatus',
  async (_, thunkAPI) => {
    try {
      const cart = await commerce.cart.retrieve();
      return cart;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error while fetching cart from commerce',
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
        'Got error while adding book to cart from commerce',
      );
    }
  },
);

export const updateBookCart = createAsyncThunk(
  'cart/updateBookCartStatus',
  async (params: { id: string; quantity: number }, thunkAPI) => {
    try {
      const { cart } = await commerce.cart.update(params.id, {
        quantity: params.quantity,
      });
      return cart;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error while updating book to cart from commerce',
      );
    }
  },
);

export const deleteBookFromCart = createAsyncThunk(
  'cart/deleteBookFromCartStatus',
  async (idItem: string, thunkAPI) => {
    try {
      const { cart } = await commerce.cart.remove(idItem);
      return cart;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error while deleting book to cart from commerce',
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
        'Got error while making cart empty from commerce',
      );
    }
  },
);

interface CartState {
  cart: Cart;
  itemIdsAtCart: string[];
  loading: boolean;
  error: string;
}

const initialState: CartState = {
  cart: {} as Cart,
  itemIdsAtCart: [],
  loading: false,
  error: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    insertItemId: (state, action: PayloadAction<string>): void => {
      if (action.payload) {
        console.log(action.payload);
        state.itemIdsAtCart = state.itemIdsAtCart.concat(action.payload);
        console.log(state.itemIdsAtCart);
      }
    },
  },
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
    });
    builder.addCase(addBookToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(updateBookCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(deleteBookFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(emptyCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
  },
});

export const { insertItemId } = cartSlice.actions;
export default cartSlice.reducer;
