import { Product, ProductResponse, ProductStatus } from "@/models";
import { createAdaptedAssignmentPeople } from "./assignment-people.adapter";

export const createAdaptedProduct = (product: ProductResponse): Product => {
  const adaptedProduct: Product = {
    id: product.id,
    name: product.name,
    totalQuantity: product.total_quantity,
    quantityType: product.quantity_type,
    quantityAvailable: product.quantity_available,
    ubication: product.ubication,
    observation: product.observation,
    active: product.active as ProductStatus,
    assignmentPeople: product.assignmentPeople.map((people) =>
      createAdaptedAssignmentPeople(people)
    ),
  };
  return adaptedProduct;
};
