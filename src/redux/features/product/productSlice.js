import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ page, limit }) => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    // Simulate pagination by slicing the response data
    const start = (page - 1) * limit;
    const end = page * limit;
    return response.data.slice(start, end);
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.totalPages = Math.ceil(20 / 8); // Assuming 20 products total and 8 per page
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = productSlice.actions;

export default productSlice.reducer;
