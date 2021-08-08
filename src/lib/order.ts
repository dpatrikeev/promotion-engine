import { Cart, Products, Promotion } from '../interfaces';

export const getSubtotalOrderValue = (cart: Cart, products: Products) => {
  let totalValue = 0;

  cart.forEach((items, sku) => {
    const productValue = products.get(sku);

    totalValue = totalValue + productValue * items;
  });

  return totalValue;
};

const getTotalOrderValue = (
  cart: Cart,
  products: Products,
  promotions?: Promotion[]
) => {
  const subtotalValue = getSubtotalOrderValue(cart, products);
  let totalDiscount = 0;

  return subtotalValue - totalDiscount;
};

export default getTotalOrderValue;
