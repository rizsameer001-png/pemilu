export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | null;
  code?: number | string;
  timestamp?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  details?: Record<string, unknown>;
  isNetworkError?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface BackendHealthStatus {
  status: 'online' | 'offline' | 'checking' | 'error';
  baseUrl: string;
  latencyMs?: number;
  message?: string;
  lastCheckedAt?: string;
}
