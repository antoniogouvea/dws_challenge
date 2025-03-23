export interface Filter {
  id?: number;
  name?: string;
  type?: string;
  created_at?: number;
}

export interface Pagination {
  offset?: number;
  limit?: number;
}

export interface Sort {
  field: string;
  order: 'asc' | 'desc';
}
