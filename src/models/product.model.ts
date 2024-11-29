import {
  AssignmentPeopleResponse,
  AssignmentPeople,
} from "./assignment-people.model";
import { Ubication, UbicationResponse } from "./ubication.model";

export enum ProductStatus {
  Active = "A",
  Inactive = "I",
}

export interface Product {
  id: number;
  name: string;
  totalQuantity: number;
  quantityType: string;
  quantityAvailable: number;
  ubication: Ubication;
  observation: string | null;
  active: ProductStatus;
  assignmentPeople: AssignmentPeople[];
  productHistories: ProductHistories[];
}

export interface ProductResponse {
  id: number;
  name: string;
  total_quantity: number;
  quantity_type: string;
  quantity_available: number;
  ubication: UbicationResponse;
  observation: string | null;
  active: string;
  assignmentPeople: AssignmentPeopleResponse[];
  productHistories: ProductHistoriesResponse[];
}

export interface ProductRequest {
  name: string;
  total_quantity: string;
  quantity_type: string;
  ubication: number;
  observation: string | null;
  active: string | undefined;
}

export interface ProductHistories {
  id: number;
  peopleName: string | null;
  peoplePhone: string | null;
  peopleEmail: string | null;
  assignmentQuantity: number | null;
  devolutionDate: string | null;
  assignDate: string | null;
  observation: string;
}
export interface ProductHistoriesResponse {
  id: number;
  people_name: string | null;
  people_phone: string | null;
  people_email: string | null;
  assignment_quantity: number | null;
  devolution_date: string | null;
  assign_date: string | null;
  observation: string;
}
