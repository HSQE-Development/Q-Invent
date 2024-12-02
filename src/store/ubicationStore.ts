import { createAdaptedUbication } from "@/adapters/ubication.adapter";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  Ubication,
  UbicationResponse,
} from "@/models";
import { create } from "zustand";

type UbicationState = {
  ubications: Ubication[];
  loading: boolean;
};

type Actions = {
  getAllUbications: () => Promise<void>;
};

export const useUbicationStore = create<UbicationState & Actions>()((set) => ({
  ubications: [],
  loading: false,
  getAllUbications: async () => {
    set({ loading: true });
    try {
      const response = await apiClient.get<
        ApiSuccesResponse<{ ubications: UbicationResponse[] }>
      >("/ubications");

      const adaptedUbications = response.data.data.ubications.map((u) =>
        createAdaptedUbication(u)
      );
      set({
        ubications: adaptedUbications,
        loading: false,
      });
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      return Promise.reject(err.message);
    }
  },
}));
