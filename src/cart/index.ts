import { Stock } from "../global/stock";
import { Cart } from "../global/cart";
import { CartView } from "./cartView";

const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get('productId'));
const variantId = Number(urlParams.get('variantId'));

window.history.pushState({}, document.title, document.location.pathname);

const stock = Stock();
const cart = Cart({
  stock
});

if (productId && variantId) {

  cart.addProduct({
    productId,
    variantId,
    quantity: 1
  });

}

const cartView = CartView({
  stock,
  cart,
  element: document.getElementById("cart")!
});

cartView.update();