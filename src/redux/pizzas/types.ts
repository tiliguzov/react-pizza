export type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export interface PizzaSliceState {
  pizzas: PizzaItem[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'rejected',
}

export type FetchPizzaArgs = {
  selectedPage: number;
  selectedCategory: number;
  selectedSort: string;
  searchValue?: string;
};

export type Meta = {
  current_page: number;
  per_page: number;
  remaining_count: number;
  total_items: number;
  total_pages: number;
};

export type Responce = {
  items: PizzaItem[];
  meta: Meta;
};
