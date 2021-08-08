import {
  getAmountPromotionValue,
  getBundlePromotionValue,
} from '../lib/promotions';
import { Promotion } from '../interfaces';

describe('Promotions', () => {
  const products = new Map([
    ['A', 50],
    ['B', 30],
    ['C', 20],
    ['D', 15],
  ]);

  const APromotion: Promotion = {
    sku: 'A',
    items: 3,
    value: 130,
  };

  const BPromotion: Promotion = {
    sku: 'B',
    items: 2,
    value: 45,
  };

  const CDPromotion: Promotion = {
    sku: ['C', 'D'],
    items: 1,
    value: 30,
  };

  describe('Amount promotion value', () => {
    it('3A, 150 - 130 = 20', () => {
      const cart = new Map([['A', 3]]);

      const result = getAmountPromotionValue(cart, products, APromotion);

      expect(result).toBe(20);
    });

    it('3A * 2, 300 - 260 = 40', () => {
      const cart = new Map([
        ['A', 7],
        ['B', 1],
      ]);

      const result = getAmountPromotionValue(cart, products, APromotion);

      expect(result).toBe(40);
    });

    it('2B, 60 - 45 = 15', () => {
      const cart = new Map([['B', 2]]);

      const result = getAmountPromotionValue(cart, products, BPromotion);

      expect(result).toBe(15);
    });

    it('Invalid amount promotion', () => {
      const cart = new Map([
        ['C', 2],
        ['D', 3],
      ]);

      expect(() => {
        getAmountPromotionValue(cart, products, CDPromotion);
      }).toThrowError();
    });
  });

  describe('Bundle promotion value', () => {
    it('CD, 35 - 30 = 5', () => {
      const cart = new Map([
        ['C', 1],
        ['D', 1],
      ]);

      const result = getBundlePromotionValue(cart, products, CDPromotion);

      expect(result).toBe(5);
    });

    it('CD * 2, 70 - 60 = 10', () => {
      const cart = new Map([
        ['C', 2],
        ['D', 3],
      ]);

      const result = getBundlePromotionValue(cart, products, CDPromotion);

      expect(result).toBe(10);
    });

    it('Invalid bundle promotion', () => {
      const cart = new Map([
        ['C', 2],
        ['D', 3],
      ]);

      expect(() => {
        getBundlePromotionValue(cart, products, APromotion);
      }).toThrowError();
    });
  });
});
