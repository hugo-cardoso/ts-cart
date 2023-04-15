import { Stock } from "./stock";
import { Cart } from "./cart";

type CartViewOptions = {
  stock: ReturnType<typeof Stock>;
  cart: ReturnType<typeof Cart>;
  element: HTMLElement;
  updateView: () => void;
}

export function CartView(cartViewOptions: CartViewOptions) {

  function addEvents() {
    cartViewOptions.element.querySelectorAll(".descrease").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.parentElement!;

        const productId = Number(card.getAttribute("data-productId"));
        const variantId = Number(card.getAttribute("data-variantId"));

        const cartProduct = cartViewOptions.cart.findCartProduct({
          productId,
          variantId
        });

        if (!cartProduct) return;

        if (cartProduct.quantity === 1) {
          cartViewOptions.cart.removeProduct({
            productId,
            variantId
          });
        } else {
          cartViewOptions.cart.changeProductQuantity({
            productId,
            variantId,
            quantity: cartProduct.quantity - 1
          });
        }

        cartViewOptions.updateView();
      });
    });

    cartViewOptions.element.querySelectorAll(".increase").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.parentElement!;

        const productId = Number(card.getAttribute("data-productId"));
        const variantId = Number(card.getAttribute("data-variantId"));

        const cartProduct = cartViewOptions.cart.findCartProduct({
          productId,
          variantId
        });

        if (!cartProduct) return;

        cartViewOptions.cart.changeProductQuantity({
          productId,
          variantId,
          quantity: cartProduct.quantity + 1
        });

        cartViewOptions.updateView();
      });
    });

    cartViewOptions.element.querySelectorAll(".remove").forEach(button => {
      button.addEventListener("click", () => {
        const card = button.parentElement!;

        const productId = Number(card.getAttribute("data-productId"));
        const variantId = Number(card.getAttribute("data-variantId"));

        const cartProduct = cartViewOptions.cart.findCartProduct({
          productId,
          variantId
        });

        if (!cartProduct) return;

        cartViewOptions.cart.removeProduct({
          productId,
          variantId
        });

        cartViewOptions.updateView();
      });
    });

    cartViewOptions.element.querySelectorAll("form").forEach(form => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const voucher = form.querySelector(".voucher") as HTMLInputElement;

        cartViewOptions.cart.applyVoucher(voucher.value);

        cartViewOptions.updateView();
      });
    });
  }

  function update() {
    cartViewOptions.element.innerHTML = `
      <h2>Cart</h2>
    `; 

    cartViewOptions.cart.cartItems.forEach(cartItem => {
      cartViewOptions.element.innerHTML += `
        <div class="card" data-productId="${cartItem.id}" data-variantId="${cartItem.variantId}">
          ${ cartItem.name } - ${ cartViewOptions.stock.getProductVariant(cartItem.id, cartItem.variantId).name }
          <button class="descrease">-</button>
          <span>${ cartItem.quantity }</span>
          <button class="increase">+</button>
          <button class="remove">Remove</button>
        </div>
      `;
    });

    cartViewOptions.element.innerHTML += `
      <form>
        <fieldset>
          <legend>Voucher</legend>
          <input class="voucher" />
          <button type="submit">Apply</button>
        </fieldset>
      </form>
      <h3>Total: R$ ${ cartViewOptions.cart.getTotal() }</h3>
    `;

    addEvents();
  }

  return {
    update
  }
}