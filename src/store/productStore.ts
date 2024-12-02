import { createAdaptedProduct } from "@/adapters";
import { apiClient } from "@/axios";
import {
  ApiErrorResponse,
  ApiSuccesResponse,
  AssignmentPeopleArrayRequest,
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
  loadingAssignment: boolean;
  loadingUnAssignment: boolean;
  loadingMassiveImport: boolean;
  loadingExport: boolean;
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
  setFilters: (newFilters: Record<string, string | number | null>) => void;
  countOfProducts: () => Promise<{
    active: number;
    inactive: number;
    total: number;
  }>;
  getProductById: (id: number) => Promise<Product | null>;
  updateProduct: (id: number, data: Partial<ProductRequest>) => Promise<void>;
  assignment: (
    productId: number,
    data: AssignmentPeopleRequest
  ) => Promise<void>;
  bulkAssignment: (
    productId: number,
    data: AssignmentPeopleArrayRequest[]
  ) => Promise<void>;
  unAssignment: (
    productId: number,
    peopleId: number,
    observation: string
  ) => Promise<void>;
  importProducts: (base64: string) => Promise<void>;
  allProducts: () => Promise<Product[]>;
  exportInventoryData: () => Promise<void>;
};

export const useProductStore = create<AuthState & Actions>()((set, get) => ({
  products: DEFAULT_PAGINATION,
  loading: false,
  loadingAssignment: false,
  loadingUnAssignment: false,
  loadingMassiveImport: false,
  loadingExport: false,
  product: null,
  filters: {},
  setFilters: (newFilters: Record<string, string | number | null>) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
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
      return Promise.reject(err.message);
    }
  },
  countOfProducts: async () => {
    const response = await apiClient.get<
      ApiSuccesResponse<{
        counts: {
          active: number;
          inactive: number;
          total: number;
        };
      }>
    >(`/products/counts`);
    return response.data.data.counts || 0;
  },
  getProductById: async (id) => {
    set({
      loading: true,
    });
    try {
      const response = await apiClient.get<
        ApiSuccesResponse<{ product: ProductResponse }>
      >(`/products/${id}`);
      const adaptedProduct = createAdaptedProduct(response.data.data.product);
      set({
        loading: false,
      });
      return adaptedProduct;
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({
        loading: false,
      });
      return Promise.reject(err.message);
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
      set({ loading: false });
      return Promise.reject(err.message);
    }
  },
  assignment: async (productId, data) => {
    set({ loadingAssignment: true });
    try {
      const response = await apiClient.post<
        ApiSuccesResponse<{ product: ProductResponse }>
      >(`/products/${productId}/assignment`, {
        data_assignment: data,
        is_update: false,
      });

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
        loadingAssignment: false,
      }));
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({ loadingAssignment: false });
      return Promise.reject(err.data);
    }
  },
  bulkAssignment: async (productId, data) => {
    set({ loadingAssignment: true });
    try {
      const response = await apiClient.post<
        ApiSuccesResponse<{ product: ProductResponse }>
      >(`/products/${productId}/bulk/assignment`, {
        data_assignment: data,
        is_update: true,
      });

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
        loadingAssignment: false,
      }));
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({ loadingAssignment: false });
      return Promise.reject(err.data);
    }
  },
  unAssignment: async (productId, peopleId, observation) => {
    set({ loadingUnAssignment: true });
    try {
      const response = await apiClient.post<
        ApiSuccesResponse<{ product: ProductResponse }>
      >(`/products/${productId}/unassignment/${peopleId}`, { observation });

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
        loadingUnAssignment: false,
      }));
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({ loadingUnAssignment: false });
      return Promise.reject(err.data);
    }
  },
  importProducts: async (base64) => {
    set({ loadingMassiveImport: true });
    try {
      // No asigno los products al array directamente ya que pueden ser bastantes, mejor se hace otra consulta a getProducts
      await apiClient.post<ApiSuccesResponse<{ products: ProductResponse[] }>>(
        `/products/import/excel`,
        {
          file_base64: base64,
        }
      );

      await get().getAllProducts();

      set({
        loadingMassiveImport: false,
      });
    } catch (error) {
      const err = error as ApiErrorResponse;
      set({ loadingUnAssignment: false });
      return Promise.reject(err.data);
    }
  },
  allProducts: async () => {
    try {
      // No asigno los products al array directamente ya que pueden ser bastantes, mejor se hace otra consulta a getProducts
      const response = await apiClient.get<
        ApiSuccesResponse<{ products: ProductResponse[] }>
      >(`/products/all`);

      return response.data.data.products.map((product) =>
        createAdaptedProduct(product)
      );
    } catch (error) {
      const err = error as ApiErrorResponse;
      return Promise.reject(err.data);
    }
  },
  exportInventoryData: async () => {
    set({
      loadingExport: true,
    });
    try {
      const response = await apiClient.post<
        ApiSuccesResponse<{ file: string; file_name: string }>
      >(`/products/inventory/export`);

      const link = document.createElement("a");
      link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.data.data.file}`;
      link.download = response.data.data.file_name;
      set({
        loadingExport: false,
      });

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      set({
        loadingExport: false,
      });
      const err = error as ApiErrorResponse;
      return Promise.reject(err.data);
    }
  },
}));
