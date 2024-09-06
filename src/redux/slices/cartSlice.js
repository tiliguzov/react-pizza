import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
      state.totalCount++;
    },
    plusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      findItem.count++;
      state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
      state.totalCount++;
    },
    minusItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      findItem.count--;
      state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
      state.totalCount--;
      if (findItem.count === 0) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }
    },
    removeItem: (state, action) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      state.totalCount -= findItem.count;
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => (sum += item.price * item.count), 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, plusItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
