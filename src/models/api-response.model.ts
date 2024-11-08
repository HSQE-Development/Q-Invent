export interface ApiSuccesResponse<T> {
  success: boolean;
  data: T;
  message: string;
  status?: number;
}

export interface ApiErrorResponse {
  message: string;
  status: number;
  data?: any;
}
