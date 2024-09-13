import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from '../slices/pizzasSlice';

const initialState = {
  selectedCategory: 0,
  selectedSort: 0,
  selectedPage: 0,
  pageCount: 0,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = Number(action.payload);
    },
    setSort: (state, action) => {
      state.selectedSort = Number(action.payload);
    },
    setPageCount: (state, action) => {
      state.pageCount = Number(action.payload);
    },
    setSelectedPage: (state, action) => {
      state.selectedPage = Number(action.payload);
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFilters: (state, action) => {
      state.pageCount = Number(action.payload.pageCount);
      state.selectedSort = Number(action.payload.selectedSort);
      state.selectedCategory = Number(action.payload.selectedCategory);
      state.selectedPage = Number(action.payload.selectedPage);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.selectedPage = Number(action.payload.meta.current_page - 1);
      state.pageCount = Number(action.payload.meta.total_pages);
      console.log('Filter FULFILLED', state.selectedPage, state.pageCount);
    });
  },
});

export const {
  setCategory,
  setSort,
  setSelectedPage,
  setPageCount,
  setSearchValue,
  setFilters,
  setPageInfo,
} = filterSlice.actions;

export default filterSlice.reducer;
