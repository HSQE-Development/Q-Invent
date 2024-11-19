import { AssignmentPeople, AssignmentPeopleResponse } from "@/models";

export const createAdaptedAssignmentPeople = (
  people: AssignmentPeopleResponse
): AssignmentPeople => {
  const adaptedPeople: AssignmentPeople = {
    id: people.id,
    name: people.name,
    email: people.email,
    phone: people.phone,
    assignedQuantity: people.assigned_quantity,
  };
  return adaptedPeople;
};
