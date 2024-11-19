import { createAdaptedProduct } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  AssignmentPeopleRequest,
  Pagination,
  Product,
  ProductRequest,
  ProductResponse,
} from "@/models";
import { toast } from "sonner";
import { create } from "zustand";

type AuthState = {
  products: Pagination<Product[]>;
  product: Product | null;
  loading: boolean;
  filters?: Record<string, any>;
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

type Actions = {
  getAllProducts: () => Promise<void>;
  createProduct: (data: ProductRequest) => Promise<void>;
  countOfProducts: (state?: string) => number;
  getProductById: (id: number) => Promise<Product | null>;
  updateProduct: (id: number, data: Partial<ProductRequest>) => Promise<void>;
  assignment: (
    productId: number,
    data: AssignmentPeopleRequest
  ) => Promise<void>;
};

export const useProductStore = create<AuthState & Actions>()((set, get) => ({
  products: DEFAULT_PAGINATION,
  loading: false,
  product: null,
  filters: {},
  getAllProducts: async () => {
    set({ loading: true });

    try {
      const filters = get().filters;
      const queryString = filters
        ? "?" +
          new URLSearchParams(filters as Record<string, string>).toString()
        : "";

      const response = await apiClient.get<
        ApiSuccesResponse<{ products: Pagination<ProductResponse[]> }>
      >(`/products${queryString}`);

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
  createProduct: async (data) => {
    set({ loading: true });
    try {
      const {
        data: { data: productResponse },
      } = await apiClient.post<ApiSuccesResponse<{ product: ProductResponse }>>(
        "/products",
        data
      );

      const adaptedProduct = createAdaptedProduct(productResponse.product);
      set((state) => ({
        products: {
          ...state.products,
          data: [...state.products.data, adaptedProduct],
          total: state.products.total + 1,
        },
        loading: false,
      }));
      toast.success("Registro correcto.", {
        description: "Registraste un nuevo producto ;D",
      });
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      throw new Error(err.message);
    }
  },
  countOfProducts: (state) => {
    let count = 0;
    count = get().products.total || 0;
    if (state) {
      count =
        get().products.data.filter((product) => product.active === state)
          .length || 0;
    }
    return count;
  },
  getProductById: async (id) => {
    try {
      const response = await apiClient.get<
        ApiSuccesResponse<{ product: ProductResponse }>
      >(`/products/${id}`);
      const adaptedProduct = createAdaptedProduct(response.data.data.product);
      return adaptedProduct;
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      throw new Error(err.message);
    }
  },
  updateProduct: async (id, data) => {
    set({ loading: true });

    try {
      const response = await apiClient.patch<
        ApiSuccesResponse<{ product: ProductResponse }>
      >(`/products/${id}`, data);
      const adaptedProduct = createAdaptedProduct(response.data.data.product);
      set((state) => ({
        products: {
          ...state.products,
          data: state.products.data.map((product) =>
            product.id === adaptedProduct.id
              ? { ...product, ...adaptedProduct }
              : product
          ),
        },
        loading: false,
      }));
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      throw new Error(err.message);
    }
  },
  assignment: async (productId, data) => {
    set({ loading: true });
    try {
      const response = await apiClient.post<
        ApiSuccesResponse<{ product: ProductResponse }>
      >(`/products/${productId}/assignment`);

      const adaptedProduct = createAdaptedProduct(response.data.data.product);

      set((state) => ({
        products: {
          ...state.products,
          data: state.products.data.map((product) =>
            product.id === adaptedProduct.id
              ? { ...product, ...adaptedProduct }
              : product
          ),
        },
        loading: false,
      }));
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      throw new Error(err.message);
    }
  },
}));
