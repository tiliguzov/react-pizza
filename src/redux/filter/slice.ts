import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from '../pizzas/asyncActions';
import { FilterSliceState, Order, SortNames } from './types';

const initialState: FilterSliceState = {
  selectedCategory: 0,
  selectedSort: SortNames.RATING,
  selectedPage: 0,
  pageCount: 0,
  searchValue: '',
  selectedOrder: Order.ASC,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
    setSort: (state, action: PayloadAction<SortNames>) => {
      state.selectedSort = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    setSelectedPage: (state, action: PayloadAction<number>) => {
      state.selectedPage = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.pageCount = action.payload.pageCount;
      state.selectedSort = action.payload.selectedSort;
      state.selectedCategory = action.payload.selectedCategory;
      state.selectedPage = action.payload.selectedPage;
      state.selectedOrder = action.payload.selectedOrder;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.selectedPage = action.payload.meta.current_page - 1;
      state.pageCount = action.payload.meta.total_pages;
    });
  },
});

export const {
  setCategory,
  setSort,
  setSelectedPage,
  setPageCount,
  setOrder,
  setSearchValue,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
