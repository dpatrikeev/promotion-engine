import getTotalOrderValue from '../lib/order';
import { Promotion } from '../interfaces';

describe('Promotion Engine', () => {
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

  const promotions = [APromotion, BPromotion, CDPromotion];

  describe('Basic checkout scenarios', () => {
    it('Scenario A: 1A, 1B, 1C = 100', () => {
      const cart = new Map([
        ['A', 1],
        ['B', 1],
        ['C', 1],
      ]);

      const result = getTotalOrderValue(cart, products, promotions);

      expect(result).toBe(100);
    });

    it('Scenario B: 5A, 5B, 1C = 370', () => {
      const cart = new Map([
        ['A', 5],
        ['B', 5],
        ['C', 1],
      ]);

      const result = getTotalOrderValue(cart, products, promotions);

      expect(result).toBe(370);
    });

    it('Scenario C: 3A, 5B, 1C, 1D = 280', () => {
      const cart = new Map([
        ['A', 3],
        ['B', 5],
        ['C', 1],
        ['D', 1],
      ]);

      const result = getTotalOrderValue(cart, products, promotions);

      expect(result).toBe(280);
    });
  });

  describe('Extra checkout scenarios', () => {
    it('Empty cart', () => {
      const cart = new Map();

      const result = getTotalOrderValue(cart, products, promotions);

      expect(result).toBe(0);
    });

    it('No promotions', () => {
      const cart = new Map([
        ['A', 5],
        ['B', 5],
        ['C', 1],
      ]);

      const result = getTotalOrderValue(cart, products);

      expect(result).toBe(420);
    });

    it('With 2 bundles', () => {
      const cart = new Map([
        ['A', 3],
        ['B', 5],
        ['C', 2],
        ['D', 2],
      ]);

      const result = getTotalOrderValue(cart, products, promotions);

      expect(result).toBe(310);
    });

    it('With 1 bundle & 1 product in a bundle', () => {
      const cart = new Map([
        ['A', 3],
        ['B', 5],
        ['C', 2],
        ['D', 1],
      ]);

      const result = getTotalOrderValue(cart, products, promotions);

      expect(result).toBe(300);
    });
  });
});
