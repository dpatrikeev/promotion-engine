export type Products = Map<string, number>;
export type Cart = Map<string, number>;

export interface Promotion {
  sku: string | string[];
  items: number;
  value: number;
}
