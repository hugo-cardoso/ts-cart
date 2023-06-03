import { Stock } from "../global/stock";
import { GalleryView } from "./galleryView";
import { InfoView } from "./infoView";

const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get('productId'));
const variantId = Number(urlParams.get('variantId'));

if (!productId || !variantId) {
  throw new Error('Missing url product info.');
}

const stock = Stock();

const product = stock.getProduct(productId);
const variant = stock.getProductVariant(productId, variantId);

const galleryView = GalleryView({
  product,
  variant,
  element: document.getElementById("gallery")!
});

const infoView = InfoView({
  product,
  variant,
  element: document.getElementById("info")!
});

galleryView.update();
infoView.update();

