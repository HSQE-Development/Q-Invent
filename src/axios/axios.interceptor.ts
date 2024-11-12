import { apiUrl } from "@/config";
import { ApiErrorResponse, ApiSuccesResponse } from "@/models";
import axios from "axios";

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

//Interceptor para solicitudes, para agregarle el token de auth a cada peticion
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("q-invent-token-auth");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//Interceptor para respuesta de nuestro backen, manejo de interfaz de respuesta tanto para SUCCESS como para ERROR
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data as ApiSuccesResponse<any>;
    if (data.success) {
      return response;
    } else {
      return Promise.reject({
        message: data.message || "Error Interno.",
        status: data.status || 500,
        data: data.data,
      } as ApiErrorResponse);
    }
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
      return Promise.reject({
        message: data.message || "Error Interno.",
        status: status,
        data: data,
      } as ApiErrorResponse);
    } else {
      return Promise.reject({
        message: "Error de red",
        status: 0,
      } as ApiErrorResponse);
    }
  }
);

export default apiClient;
