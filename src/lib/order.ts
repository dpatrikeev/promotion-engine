import { Cart, Products, Promotion } from '../interfaces';
import { getBundlePromotionValue, getAmountPromotionValue } from './promotions';

export const getSubtotalOrderValue = (cart: Cart, products: Products) => {
  let totalValue = 0;

  cart.forEach((items, sku) => {
    if (products.get(sku) === undefined) {
      throw new Error('A non-valid product has been added to the cart.');
    }

    const productValue = products.get(sku);

    totalValue = totalValue + productValue * items;
  });

  return totalValue;
};

const getDiscountValue = (
  cart: Cart,
  products: Products,
  promotion: Promotion
) => {
  const isBundlePromotion = Array.isArray(promotion.sku);

  if (isBundlePromotion) {
    return getBundlePromotionValue(cart, products, promotion);
  } else {
    return getAmountPromotionValue(cart, products, promotion);
  }
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
