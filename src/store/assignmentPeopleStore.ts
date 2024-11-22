import { createAdaptedAssignmentPeople } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  AssignmentPeople,
  AssignmentPeopleArrayRequest,
  AssignmentPeopleRequest,
  AssignmentPeopleResponse,
} from "@/models";
import { create } from "zustand";

type AssignmentPeopleState = {
  assignmentPeoples: AssignmentPeople[];
  loading: boolean;
  filters?: Record<string, any>;
  assignment: AssignmentPeopleRequest | null;
  assignments: AssignmentPeopleArrayRequest[];
};

type Actions = {
  getAllAssignmentPeople: () => Promise<void>;
  setAssignment: (data: Partial<AssignmentPeopleRequest>) => void;
  resetAssignment: () => void;
  setAssignments: (newAssignment: AssignmentPeopleArrayRequest) => void;
  clearAssignments: () => void;
};

export const useAssignmentPeopleStore = create<
  AssignmentPeopleState & Actions
>()((set) => ({
  assignmentPeoples: [],
  loading: false,
  filters: {},
  assignment: null,
  assignments: [],
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
    console.log("Updating assignment:", data);
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
  resetAssignment: () => {
    set({
      assignment: null,
    });
  },
  setAssignments: (newAssignment) => {
    set((state) => {
      const existingIndex = state.assignments.findIndex(
        (a) => a.people_id === newAssignment.people_id
      );

      if (existingIndex !== -1) {
        // Si ya existe, actualizamos la cantidad asignada
        const updatedAssignments = [...state.assignments];
        updatedAssignments[existingIndex] = newAssignment;
        return { assignments: updatedAssignments };
      } else {
        // Si no existe, lo añadimos
        return { assignments: [...state.assignments, newAssignment] };
      }
    });
  },
  clearAssignments: () => {
    set({
      assignments: [],
    });
  },
}));
