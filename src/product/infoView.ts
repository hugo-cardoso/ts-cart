import { Product, ProductVariant } from "../global/types";

type InfoViewOptions = {
  product: Product;
  variant: ProductVariant;
  element: HTMLElement;
};

export function InfoView(infoViewOptions: InfoViewOptions) {
  const { product, variant, element } = infoViewOptions;

  function update() {
    element.innerHTML = `
      <div>
        <h1>${ product.name } (${ variant.name })</h1>
        <p>R$ ${ variant.price }</p>
        <a href="/cart.html?productId=${ product.id }&variantId=${ variant.id }">Comprar</a>
      </div>
    `;
  }

  return {
    update
  }
}