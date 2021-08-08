import { Cart, Products, Promotion } from '../interfaces';

export const getSubtotalOrderValue = (cart: Cart, products: Products) => {
  let totalValue = 0;

  cart.forEach((items, sku) => {
    const productValue = products.get(sku);

    totalValue = totalValue + productValue * items;
  });

  return totalValue;
};

const getDiscountValue = (
  cart: Cart,
  products: Products,
  { sku, items, value }: Promotion
) => {
  let discount = 0;
  const cartItems = cart.get(sku as string);

  if (cartItems && cartItems >= items) {
    const discountItems = Math.floor(cartItems / items);
    const productValue = products.get(sku as string);

    const subtotal = productValue * cartItems;
    const discounted = value * discountItems;
    const left = productValue * (cartItems - items * discountItems);

    discount = subtotal - (discounted + left);
  }

  return discount;
};

const getTotalOrderValue = (
  cart: Cart,
  products: Products,
  promotions?: Promotion[]
) => {
  const subtotalValue = getSubtotalOrderValue(cart, products);
  let totalDiscount = 0;

  if (promotions) {
    totalDiscount = promotions.reduce((acc, promotion) => {
      return (acc = acc + getDiscountValue(cart, products, promotion));
    }, 0);
  }

  return subtotalValue - totalDiscount;
};

export default getTotalOrderValue;
