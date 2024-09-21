import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'rejected',
}

interface PizzaSliceState {
  pizzas: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

type FetchPizzaArgs = {
  selectedPage: number;
  selectedCategory: number;
  selectedSort: string;
  searchValue?: string;
};

type Meta = {
  current_page: number;
  per_page: number;
  remaining_count: number;
  total_items: number;
  total_pages: number;
};

type Responce = {
  items: PizzaItem[];
  meta: Meta;
};

export const fetchPizzas = createAsyncThunk<Responce, FetchPizzaArgs>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { selectedPage, selectedCategory, selectedSort, searchValue } = params;

    const url = new URL('https://c93cfe3de0ee6e43.mokky.dev/items');

    url.searchParams.append('page', String(selectedPage + 1));
    url.searchParams.append('limit', '4');
    if (selectedCategory > 0) {
      url.searchParams.append('category', String(selectedCategory));
    }
    url.searchParams.append('sortBy', selectedSort);
    if (searchValue) {
      url.searchParams.append('title', `*${searchValue}`);
    }

    const { data } = await axios.get<Responce>(url.toString());

    console.log(data);

    return data;
  },
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.pizzas = [];
        console.log('PENDING');
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload.items;
        state.status = Status.SUCCESS;
        console.log('FULFILLED');
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.pizzas = [];
        console.error('Error occurred:', action);
        state.status = Status.ERROR;
      });
  },
});

export default pizzasSlice.reducer;
