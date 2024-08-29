import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: 0,
  selectedSort: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload.index;
    },
    setSort: (state, action) => {
      state.selectedSort = action.payload.index;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;
