export type ProductVariant = {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type Product = {
  id: number;
  name: string;
  variants: ProductVariant[];
}

export type CartItem = {
  variantId: number;
  quantity: number;
  price: number;
} & Omit<Product, 'variants'>;

export enum ViewsEnum {
  STOCK = 'stock',
  CART = 'cart',
}

export type UpdateViewFunction = (view?: ViewsEnum) => void;