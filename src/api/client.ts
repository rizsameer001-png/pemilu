import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '../config/env';
import { storage } from '../utils/storage';
import { parseApiError } from '../utils/errorHandler';
import { BackendHealthStatus } from '../types/api';

/**
 * Centralized Axios API Client for ChunavAi Election Campaign OS.
 * BASE_URL is strictly defined in config/env.ts and never duplicated.
 */
class ApiClient {
  private instance: AxiosInstance;
  private authToken: string | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: ENV.BASE_URL,
      timeout: ENV.API_TIMEOUT_MS,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-App-Platform': 'mobile-os',
      },
    });

    this.setupInterceptors();
  }

  public setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  private setupInterceptors(): void {
    // Request Interceptor: Attach bearer token if available
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (!this.authToken) {
          const storedToken = await storage.getItem(ENV.STORAGE_KEYS.AUTH_TOKEN);
          if (storedToken) {
            this.authToken = storedToken;
          }
        }

        if (this.authToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor: Uniform error handling & 401 handling
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.authToken = null;
          await storage.removeItem(ENV.STORAGE_KEYS.AUTH_TOKEN);
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  public async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  public async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  /**
   * Health Check: Safely checks backend availability without fabricating data.
   */
  public async checkBackendHealth(): Promise<BackendHealthStatus> {
    const startTime = Date.now();
    try {
      // Try root or common health endpoint with a short timeout
      const response = await this.instance.get('/', { timeout: 8000 });
      const latencyMs = Date.now() - startTime;
      return {
        status: 'online',
        baseUrl: ENV.BASE_URL,
        latencyMs,
        message: typeof response.data === 'string' ? response.data : 'Backend server reachable',
        lastCheckedAt: new Date().toISOString(),
      };
    } catch (error) {
      const latencyMs = Date.now() - startTime;
      const parsed = parseApiError(error);
      return {
        status: parsed.isNetworkError ? 'offline' : 'online',
        baseUrl: ENV.BASE_URL,
        latencyMs,
        message: parsed.message,
        lastCheckedAt: new Date().toISOString(),
      };
    }
  }

  public getRawAxios(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
