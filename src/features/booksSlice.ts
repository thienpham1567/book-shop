import { Product as Book } from '@chec/commerce.js/types/product.js';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { commerce } from '../lib/commerce.js';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooksStatus',
  async (_, thunkAPI) => {
    try {
      const { data } = await commerce.products.list();
      console.log(data);

      return data;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error when fetched book from commerce',
      );
    }
  },
);

export const fetchBooksByCategory = createAsyncThunk(
  'books/fetchBooksStatus',
  async (categories: { categories: string[] }, thunkAPI) => {
    try {
      const { data } = await commerce.products.list(categories);
      return data;
    } catch (error) {
      throw thunkAPI.rejectWithValue(
        'Got error when fetched book from commerce',
      );
    }
  },
);

interface BooksState {
  value: Book[];
  loading: boolean;
  error: string;
}

const initialState: BooksState = {
  value: [],
  loading: false,
  error: '',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch all books
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
  },
});

export const { getBooksByCategory } = booksSlice.actions;
export default booksSlice.reducer;
