export enum ViewsEnum {
  STOCK = 'stock',
  CART = 'cart',
}

export type UpdateViewFunction = (view?: ViewsEnum) => void;