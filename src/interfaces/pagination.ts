export interface PaginatedResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T;
}

export interface LocalApiPaginatedResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
  };
}
