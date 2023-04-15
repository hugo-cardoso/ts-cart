import { CartItem } from "./types";
import { Stock } from "./stock";

type AddProductOptions = {
  productId: number;
  variantId: number;
  quantity: number;
};

type RemoveProductOptions = {
  productId: number;
  variantId: number;
};

type FindProductOptions = {
  productId: number;
  variantId: number;
}

type Voucher = {
  code: string;
  discount: number;
}

type CartOptions = {
  stock: ReturnType<typeof Stock>;
}

export function Cart(cartOptions: CartOptions) {
  const cartItems: CartItem[] = [];
  const vouchers: Voucher[] = [
    {
      code: "VOUCHER1",
      discount: 10,
    }
  ];
  let voucher: Voucher;

  function addProduct(options: AddProductOptions) {
    const { productId, variantId, quantity } = options;

    const findedProduct = findProduct({ productId, variantId });

    if (!findedProduct) {
      throw new Error(`Product with id ${productId} and variant id ${variantId} not found`);
    }

    const { product, variant } = findedProduct;

    cartItems.push({
      id: product.id,
      name: product.name,
      price: variant.price,
      quantity,
      variantId,
    });
  }

  function removeProduct(options: RemoveProductOptions) {
    const { productId } = options;

    const productIndex = cartItems.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      throw new Error(`Product with id ${productId} not found`);
    }

    cartItems.splice(productIndex, 1);
  }

  function changeProductQuantity(options: AddProductOptions) {
    const { productId, variantId, quantity } = options;

    const product = findCartProduct({ productId, variantId });

    if (!product) {
      throw new Error(`Product with id ${productId} and variant id ${variantId} not found`);
    }

    product.quantity = quantity;
  }

  function getTotal() {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    if (!voucher) return subtotal;

    return subtotal - voucher.discount;
  }

  function findProduct(options: FindProductOptions) {
    const product = cartOptions.stock.getProduct(options.productId);

    if (!product) return undefined;

    const variant = cartOptions.stock.getProductVariant(options.productId, options.variantId);

    if (!variant) return undefined;

    return {
      product,
      variant,
    };
  }

  function findCartProduct(options: FindProductOptions) {
    return cartItems.find(p => p.id === options.productId && p.variantId === options.variantId);
  }

  function applyVoucher(code: string) {
    const findedVoucher = vouchers.find(v => v.code === code);

    if (!findedVoucher) {
      throw new Error(`Voucher with code ${code} not found`);
    }

    voucher = findedVoucher;
  }

  return {
    cartItems,
    addProduct,
    removeProduct,
    changeProductQuantity,
    findProduct,
    findCartProduct,
    applyVoucher,
    getTotal,
  }
}