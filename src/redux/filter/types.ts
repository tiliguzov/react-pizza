export interface FilterSliceState {
  selectedCategory: number;
  selectedSort: number;
  selectedPage: number;
  pageCount: number;
  searchValue?: string;
}
