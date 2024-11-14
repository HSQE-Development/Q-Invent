export interface Product {
  id: number;
  name: string;
  totalQuantity: string;
  ubication: string;
  observation: string | null;
}

export interface ProductResponse {
  id: number;
  name: string;
  total_quantity: string;
  ubication: string;
  observation: string | null;
}

export interface ProductRequest {
  name: string;
  total_quantity: string;
  ubication: string;
  observation: string | null;
}
