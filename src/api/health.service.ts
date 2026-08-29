import { apiClient } from './client';
import { BackendHealthStatus } from '../types/api';

export const healthService = {
  async ping(): Promise<BackendHealthStatus> {
    return apiClient.checkBackendHealth();
  },
};
