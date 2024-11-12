// Si cambia la estructura de respuesta del backend crear una nueva interfaz adaptada a la respuesta del backend y crearle su adapter en la carpeta "adapters" PORFAVOR NO MODIFICAR ESTA INTERFACE
export interface Pagination<T> {
  data: T;
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  previous_page_url: string | null;
}
