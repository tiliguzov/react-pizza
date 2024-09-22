import { CartItem } from '../redux/cart/types';

export const getCartFromLS = () => {
  const json = localStorage.getItem('cart');
  if (!json) {
    return {
      totalCount: 0,
      totalPrice: 0,
      items: [],
    };
  }
  const items = JSON.parse(json);
  const { totalCount, totalPrice } = items.reduce(
    (acc: { totalPrice: number; totalCount: number }, item: CartItem) => {
      acc.totalPrice += item.price * item.count;
      acc.totalCount += item.count;
      return acc;
    },
    { totalPrice: 0, totalCount: 0 },
  );
  return {
    totalCount: totalCount as number,
    totalPrice: totalPrice as number,
    items: items as CartItem[],
  };
};
