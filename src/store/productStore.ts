import { createAdaptedProduct } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  Pagination,
  Product,
  ProductResponse,
} from "@/models";
import { toast } from "sonner";
import { create } from "zustand";

type AuthState = {
  products: Pagination<Product[]>;
  loading: boolean;
};

export const DEFAULT_PAGINATION: Pagination<[]> = {
  data: [],
  total: 0,
  count: 0,
  per_page: 10,
  current_page: 1,
  last_page: 1,
  next_page_url: null,
  previous_page_url: null,
};

type Action = {
  getAllProducts: () => Promise<void>;
};

export const useProductStore = create<AuthState & Action>()((set) => ({
  products: DEFAULT_PAGINATION,
  loading: false,
  getAllProducts: async () => {
    set({ loading: true });

    try {
      const response = await apiClient.get<
        ApiSuccesResponse<{ products: Pagination<ProductResponse[]> }>
      >("/products");

      const responseAdapted: Pagination<Product[]> = {
        total: response.data.data.products.total,
        count: response.data.data.products.count,
        per_page: response.data.data.products.per_page,
        current_page: response.data.data.products.current_page,
        last_page: response.data.data.products.last_page,
        next_page_url: response.data.data.products.next_page_url,
        previous_page_url: response.data.data.products.previous_page_url,
        data: response.data.data.products.data.map((product) => {
          return createAdaptedProduct(product);
        }),
      };
      set({
        products: responseAdapted,
        loading: false,
      });
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      toast.error(err.message);
    }
  },
}));
