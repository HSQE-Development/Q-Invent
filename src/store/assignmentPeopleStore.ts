import { createAdaptedAssignmentPeople } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  AssignmentPeople,
  AssignmentPeopleResponse,
} from "@/models";
import { create } from "zustand";

type AssignmentPeopleState = {
  assignmentPeoples: AssignmentPeople[];
  loading: boolean;
  filters?: Record<string, any>;
};

type Actions = {
  getAllAssignmentPeople: () => Promise<void>;
};

export const useAssignmentPeopleStore = create<
  AssignmentPeopleState & Actions
>()((set, get) => ({
  assignmentPeoples: [],
  loading: false,
  filters: {},
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
}));
