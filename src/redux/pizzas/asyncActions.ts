import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzaArgs, Responce } from './types';
import axios from 'axios';
import { Order } from '../filter/types';

export const fetchPizzas = createAsyncThunk<Responce, FetchPizzaArgs>(
  'pizzas/fetchPizzas',
  async (params) => {
    const { selectedPage, selectedCategory, selectedSort, searchValue, selectedOrder } = params;

    const url = new URL('https://c93cfe3de0ee6e43.mokky.dev/items');

    url.searchParams.append('page', String(selectedPage + 1));
    url.searchParams.append('limit', '4');
    if (selectedCategory > 0) {
      url.searchParams.append('category', String(selectedCategory));
    }
    url.searchParams.append('sortBy', (selectedOrder === Order.DESC ? '-' : '') + selectedSort);
    if (searchValue) {
      url.searchParams.append('title', `*${searchValue}`);
    }

    const { data } = await axios.get<Responce>(url.toString());

    return data;
  },
);
