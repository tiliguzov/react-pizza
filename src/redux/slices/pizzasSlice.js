import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pizzas: [],
  status: 'loading',
};

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
  const { selectedPage, selectedCategory, selectedSort, searchValue } = params;

  const url = new URL('https://c93cfe3de0ee6e43.mokky.dev/items');

  url.searchParams.append('page', selectedPage + 1);
  url.searchParams.append('limit', '4');
  if (selectedCategory > 0) {
    url.searchParams.append('category', selectedCategory);
  }
  url.searchParams.append('sortBy', selectedSort);
  if (searchValue) {
    url.searchParams.append('title', `*${searchValue}`);
  }

  const responce = await axios.get(url);

  return responce.data;
});

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.pizzas = [];
        console.log('PENDING');
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload.items;
        state.status = 'success';
        console.log('FULFILLED');
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.items = [];
        console.error('Error occurred:', action);
        state.status = 'rejected';
      });
  },
});

export default pizzasSlice.reducer;
