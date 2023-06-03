import { Stock } from "../global/stock";
import { Cart } from "../global/cart";
import { StockView } from "./stockView";

import { ViewsEnum } from "./types";

const stock = Stock();
const cart = Cart({ stock });

const stockElement = document.getElementById("stock");

const stockView = StockView({
  stock,
  cart,
  element: stockElement!,
  updateView,
});

function updateView(view?: ViewsEnum) {
  switch(view) {
    case ViewsEnum.STOCK:
      stockView.update();
      break;
    default:
      stockView.update();
  }
};

stockView.update();
