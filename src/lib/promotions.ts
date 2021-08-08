import { Cart, Products, Promotion } from '../interfaces';

export const getAmountPromotionValue = (
  cart: Cart,
  products: Products,
  { sku, items, value }: Promotion
) => {
  if (Array.isArray(sku)) {
    throw new Error('Amount promotion should contain only 1 product.');
  }

  let discount = 0;
  const cartItems = cart.get(sku);

  if (cartItems && cartItems >= items) {
    const discountItems = Math.floor(cartItems / items);
    const productValue = products.get(sku) as number;

    const subtotal = productValue * cartItems;
    const discounted = value * discountItems;
    const left = productValue * (cartItems - items * discountItems);

    discount = subtotal - (discounted + left);
  }

  return discount;
};

export const getBundlePromotionValue = (
  cart: Cart,
  products: Products,
  { sku, value }: Promotion
) => {
  if (!Array.isArray(sku)) {
    throw new Error('Bundle promotion should contain more than 1 product.');
  }

  let discount = 0;

  if (sku.every((s) => cart.has(s))) {
    const discountItems = Math.min(...sku.map((s) => cart.get(s) as number));

    const subtotal = sku.reduce((acc, s) => {
      const productValue = products.get(s) as number;

      return (acc = acc + productValue);
    }, 0);

    discount = (subtotal - value) * discountItems;
  }

  return discount;
};
