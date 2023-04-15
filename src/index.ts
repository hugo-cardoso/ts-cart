import { Stock } from "./stock";
import { Cart } from "./cart";
import { StockView } from "./stockView";
import { CartView } from "./cartView";

const stock = Stock();
const cart = Cart({ stock });

const stockElement = document.getElementById("stock");
const cartElement = document.getElementById("cart");

const stockView = StockView({
  stock,
  cart,
  element: stockElement!,
  updateView,
});

const cartView = CartView({
  stock,
  cart,
  element: cartElement!,
  updateView,
});

function updateView() {
  stockView.update();
  cartView.update();
};

stockView.update();
cartView.update();