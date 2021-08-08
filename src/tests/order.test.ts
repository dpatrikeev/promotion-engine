import { getSubtotalOrderValue } from '../lib/order';

describe('Subtotal calculation', () => {
  const products = new Map([
    ['A', 50],
    ['B', 30],
    ['C', 20],
    ['D', 15],
  ]);

  it('Empty cart', () => {
    const cart = new Map();

    const result = getSubtotalOrderValue(cart, products);

    expect(result).toBe(0);
  });

  it('Unvalid cart', () => {
    const cart = new Map([
      ['A', 50],
      ['E', 50],
    ]);

    const result = getSubtotalOrderValue(cart, products);

    expect(result).toBe(NaN);
  });

  it('Basic cart', () => {
    const cart = new Map([
      ['A', 1],
      ['B', 1],
      ['C', 1],
    ]);

    const result = getSubtotalOrderValue(cart, products);

    expect(result).toBe(100);
  });
});
