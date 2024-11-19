import { createAdaptedAssignmentPeople } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  AssignmentPeople,
  AssignmentPeopleRequest,
  AssignmentPeopleResponse,
} from "@/models";
import { create } from "zustand";

type AssignmentPeopleState = {
  assignmentPeoples: AssignmentPeople[];
  loading: boolean;
  filters?: Record<string, any>;
  assignment: AssignmentPeopleRequest | null;
};

type Actions = {
  getAllAssignmentPeople: () => Promise<void>;
  setAssignment: (data: Partial<AssignmentPeopleRequest>) => void;
};

export const useAssignmentPeopleStore = create<
  AssignmentPeopleState & Actions
>()((set, get) => ({
  assignmentPeoples: [],
  loading: false,
  filters: {},
  assignment: null,
  getAllAssignmentPeople: async () => {
    set({ loading: true });

    try {
      const response = await apiClient.get<
        ApiSuccesResponse<{ assignment_peoples: AssignmentPeopleResponse[] }>
      >("/assignment-peoples");

      const adaptedPeoples = response.data.data.assignment_peoples.map(
        (people) => createAdaptedAssignmentPeople(people)
      );
      set({
        assignmentPeoples: adaptedPeoples,
      });
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      throw new Error(err.message);
    }
  },
  setAssignment: (data) => {
    set((state) => ({
      assignment: {
        name: data.name ?? (state.assignment?.name || null),
        email: data.email ?? (state.assignment?.email || null),
        phone: data.phone ?? (state.assignment?.phone || null),
        assigned_quantity:
          data.assigned_quantity ?? (state.assignment?.assigned_quantity || 0),
        people_id: data.people_id ?? (state.assignment?.people_id || null),
      },
    }));
  },
}));
