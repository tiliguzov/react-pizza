export enum Order {
  ASC = 0,
  DESC = 1,
}

export enum SortNames {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export interface FilterSliceState {
  selectedCategory: number;
  selectedSort: SortNames;
  selectedPage: number;
  pageCount: number;
  searchValue?: string;
  selectedOrder: Order;
}
