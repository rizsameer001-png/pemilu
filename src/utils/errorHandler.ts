import { isAxiosError, AxiosError } from 'axios';
import { ApiError } from '../types/api';

/**
 * Normalizes any error into a predictable ApiError structure.
 */
export function parseApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string; detail?: string }>;
    
    if (!axiosErr.response) {
      return {
        message: 'Network unreachable or server sleeping. Please check your internet connection.',
        isNetworkError: true,
        code: axiosErr.code,
      };
    }

    const data = axiosErr.response.data;
    const message =
      (typeof data === 'object' && data !== null
        ? data.message || data.error || data.detail
        : typeof data === 'string'
        ? data
        : null) ||
      axiosErr.message ||
      `Request failed with status ${axiosErr.response.status}`;

    return {
      message,
      statusCode: axiosErr.response.status,
      code: axiosErr.code,
      details: typeof data === 'object' ? (data as Record<string, unknown>) : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: typeof error === 'string' ? error : 'An unexpected error occurred.',
  };
}
