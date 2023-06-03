import { Stock } from "../global/stock";
import { Cart } from "../global/cart";

import { UpdateViewFunction } from "./types";

type StockViewOptions = {
  stock: ReturnType<typeof Stock>;
  cart: ReturnType<typeof Cart>;
  element: HTMLElement;
  updateView: UpdateViewFunction;
}

export function StockView(stockViewOptions: StockViewOptions) {

  function addEvents() {
    stockViewOptions.element.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.parentElement!;

        const productId = Number(card.getAttribute("data-productId"));
        const variantId = Number(card.querySelector("select")!.value);

        window.location.href = `/product.html?productId=${productId}&variantId=${variantId}`;      
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
          <button>VIEW</button>
        </div>
      `;
    });

    addEvents();
  }

  return {
    update
  }
}