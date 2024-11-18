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
  ubication: string;
  observation: string | null;
  active: ProductStatus;
}

export interface ProductResponse {
  id: number;
  name: string;
  total_quantity: number;
  quantity_type: string;
  quantity_available: number;
  ubication: string;
  observation: string | null;
  active: string;
}

export interface ProductRequest {
  name: string;
  total_quantity: string;
  quantity_type: string;
  ubication: string;
  observation: string | null;
  active: string | undefined;
}
