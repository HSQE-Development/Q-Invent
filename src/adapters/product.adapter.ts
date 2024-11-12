import { Product, ProductResponse } from "@/models";

export const createAdaptedProduct = (product: ProductResponse): Product => {
  const adaptedProduct: Product = {
    id: product.id,
    name: product.name,
    totalQuantity: product.total_quantity,
    ubication: product.ubication,
    observation: product.observation,
  };
  return adaptedProduct;
};
