import { RootState } from '../store';

export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj: any) => obj.id === id);

export const selectCart = (state: RootState) => state.cart;
