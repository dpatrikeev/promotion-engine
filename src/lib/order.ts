import { Cart, Products } from '../interfaces';

export const getSubtotalOrderValue = (cart: Cart, products: Products) => {
  let totalValue = 0;

  cart.forEach((items, sku) => {
    const productValue = products.get(sku);

    totalValue = totalValue + productValue * items;
  });

  return totalValue;
};
