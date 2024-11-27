import { createAdaptedAuthUser } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  Auth,
  AuthResponse,
} from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  authUser: Auth | null;
  loading: boolean;
};

type Action = {
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState & Action>()(
  persist(
    (set) => ({
      authUser: null,
      loading: false,
      signIn: async (email, password) => {
        set({ loading: true });

        try {
          const response = await apiClient.post<
            ApiSuccesResponse<AuthResponse>
          >("/auth/login", {
            email,
            password,
          });
          const adaptedAuthUser = createAdaptedAuthUser(response.data.data);
          localStorage.setItem(
            "q-invent-token-auth",
            adaptedAuthUser.accesToken
          );
          set({
            authUser: adaptedAuthUser,
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
      logout: async () => {
        set({ loading: true });
        try {
          await apiClient.post<ApiSuccesResponse<any>>("/auth/logout");

          set({
            authUser: null,
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
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
