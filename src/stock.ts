import { Product, ProductVariant } from "./types";

export function Stock() {
  const products: Product[] = [
    {
      id: 1,
      name: "Camiseta",
      variants: [
        {
          id: 1,
          name: "Branca",
          price: 10,
          quantity: 3,
        },
        {
          id: 2,
          name: "Azul",
          price: 20,
          quantity: 3,
        }
      ],
    },
    {
      id: 2,
      name: "Blusa",
      variants: [
        {
          id: 1,
          name: "P",
          price: 10,
          quantity: 10,
        },
        {
          id: 2,
          name: "M",
          price: 20,
          quantity: 10,
        }
      ],
    }
  ];

  function getProduct(productId: number): Product {
    const product = products.find(p => p.id === productId);

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    return product;
  };

  function getProductVariant(productId: number, variantId: number): ProductVariant {
    const product = getProduct(productId);
  
    const variant = product.variants.find(v => v.id === variantId);

    if (!variant) {
      throw new Error(`Variant with id ${variantId} not found`);
    }

    return variant;
  }

  return {
    products,
    getProduct,
    getProductVariant,
  }
}