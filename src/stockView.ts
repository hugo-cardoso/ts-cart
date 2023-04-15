import { Stock } from "./stock";
import { Cart } from "./cart";

type StockViewOptions = {
  stock: ReturnType<typeof Stock>;
  cart: ReturnType<typeof Cart>;
  element: HTMLElement;
  updateView: () => void;
}

export function StockView(stockViewOptions: StockViewOptions) {

  function addEvents() {
    stockViewOptions.element.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.parentElement!;

        const productId = Number(card.getAttribute("data-productId"));
        const variantId = Number(card.querySelector("select")!.value);

        const cartProduct = stockViewOptions.cart.findCartProduct({
          productId,
          variantId
        });

        if (cartProduct) {

          stockViewOptions.cart.changeProductQuantity({
            productId,
            variantId,
            quantity: cartProduct.quantity + 1
          });
        } else {

          stockViewOptions.cart.addProduct({
            productId,
            variantId,
            quantity: 1
          });
        }
        stockViewOptions.updateView();       
      });
    });
  }

  function update() {
    stockViewOptions.element.innerHTML = `
      <h2>Stock</h2>
    `;

    stockViewOptions.stock.products.forEach(product => {
      stockViewOptions.element.innerHTML += `
        <div class="card" data-productId="${product.id}">
          <p>${ product.name }</p>
          <select>
            <options value="">Choose a variant</options>
            ${
              product.variants.map(variant => {
                return `<option value="${variant.id}">${ variant.name }</option>`
              }).join("")
            }
          </select>
          <button>ADD</button>
        </div>
      `;
    });

    addEvents();
  }

  return {
    update
  }
}