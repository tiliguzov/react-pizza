import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: 0,
  selectedSort: 0,
  selectedPage: 0,
  pageCount: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
    setFilters: (state, action) => {
      state.pageCount = Number(action.payload.pageCount);
      state.selectedSort = Number(action.payload.selectedSort);
      state.selectedCategory = Number(action.payload.selectedCategory);
      state.selectedPage = Number(action.payload.selectedPage);
    },
  },
});

export const { setCategory, setSort, setSelectedPage, setPageCount, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
