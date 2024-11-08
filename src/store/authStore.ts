import { createAdaptedAuthUser } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  Auth,
  AuthResponse,
} from "@/models";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  authUser: Auth | null;
  loading: boolean;
};

type Action = {
  signIn: (email: string, password: string) => Promise<void>;
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
          toast.success("Bienvenido ;)", {
            richColors: false,
            closeButton: true,
            description: "Ingresando...",
          });
        } catch (error) {
          const err = error as ApiErrorResponse;
          set({
            loading: false,
          });
          toast.error(err.message);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);
