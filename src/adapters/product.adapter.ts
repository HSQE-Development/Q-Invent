import {
  Product,
  ProductHistories,
  ProductHistoriesResponse,
  ProductResponse,
  ProductStatus,
} from "@/models";
import { createAdaptedAssignmentPeople } from "./assignment-people.adapter";
import { createAdaptedUbication } from "./ubication.adapter";

export const createAdaptedProductHistory = (
  history: ProductHistoriesResponse
): ProductHistories => {
  const adaptedHistory: ProductHistories = {
    id: history.id,
    peopleName: history.people_name,
    peoplePhone: history.people_phone,
    peopleEmail: history.people_email,
    assignmentQuantity: history.assignment_quantity,
    assignDate: history.assign_date,
    devolutionDate: history.devolution_date,
    observation: history.observation,
  };
  return adaptedHistory;
};

export const createAdaptedProduct = (product: ProductResponse): Product => {
  const adaptedProduct: Product = {
    id: product.id,
    name: product.name,
    totalQuantity: product.total_quantity,
    quantityType: product.quantity_type,
    quantityAvailable: product.quantity_available,
    ubication: createAdaptedUbication(product.ubication),
    observation: product.observation,
    active: product.active as ProductStatus,
    assignmentPeople: product.assignmentPeople.map((people) =>
      createAdaptedAssignmentPeople(people)
    ),
    productHistories: product.productHistories.map((history) =>
      createAdaptedProductHistory(history)
    ),
  };
  return adaptedProduct;
};
