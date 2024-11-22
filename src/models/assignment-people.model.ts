export interface AssignmentPeople {
  id: number;
  name: string;
  email: string;
  phone: number;
  assignedQuantity: number | null;
}
export interface AssignmentPeopleResponse {
  id: number;
  name: string;
  email: string;
  phone: number;
  assigned_quantity: number | null;
}

export interface AssignmentPeopleRequest {
  name: string | null;
  email: string | null;
  phone: string | null;
  assigned_quantity: number;
  people_id: number | null;
}

export interface AssignmentPeopleArrayRequest {
  people_id: number;
  assigned_quantity: number;
}
