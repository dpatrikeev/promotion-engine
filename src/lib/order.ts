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

  if (Array.isArray(sku)) {
    if (sku.every((s) => cart.has(s))) {
      const discountItems = Math.min(...sku.map((s) => cart.get(s)));

      const subtotal = sku.reduce((acc, s) => {
        const productValue = products.get(s);

        return (acc = acc + productValue);
      }, 0);

      discount = (subtotal - value) * discountItems;
    }
  } else {
    const cartItems = cart.get(sku);

    if (cartItems && cartItems >= items) {
      const discountItems = Math.floor(cartItems / items);
      const productValue = products.get(sku);

      const subtotal = productValue * cartItems;
      const discounted = value * discountItems;
      const left = productValue * (cartItems - items * discountItems);

      discount = subtotal - (discounted + left);
    }
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
