import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchPizzas } from './pizzasSlice';

interface FilterSliceState {
  selectedCategory: number;
  selectedSort: number;
  selectedPage: number;
  pageCount: number;
  searchValue?: string;
}

const initialState: FilterSliceState = {
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
    setCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
    setSort: (state, action: PayloadAction<number>) => {
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
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.pageCount = action.payload.pageCount;
      state.selectedSort = action.payload.selectedSort;
      state.selectedCategory = action.payload.selectedCategory;
      state.selectedPage = action.payload.selectedPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.selectedPage = action.payload.meta.current_page - 1;
      state.pageCount = action.payload.meta.total_pages;
      console.log('Filter FULFILLED', state.selectedPage, state.pageCount);
    });
  },
});

export const { setCategory, setSort, setSelectedPage, setPageCount, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
