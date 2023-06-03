import { Product, ProductVariant } from "../global/types";

type GalleryViewOptions = {
  product: Product;
  variant: ProductVariant;
  element: HTMLElement;
};

export function GalleryView(galleryViewOptions: GalleryViewOptions) {
  const { product } = galleryViewOptions;

  function update() {
    galleryViewOptions.element.innerHTML = `
      <img src="${ product.image }" />
    `;
  }

  return {
    update
  }
}