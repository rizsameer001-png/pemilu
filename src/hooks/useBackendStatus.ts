import { useQuery } from '@tanstack/react-query';
import { healthService } from '../api/health.service';
import { BackendHealthStatus } from '../types/api';

export function useBackendStatus() {
  const query = useQuery<BackendHealthStatus>({
    queryKey: ['backend-health'],
    queryFn: () => healthService.ping(),
    staleTime: 30000,
    refetchInterval: 60000,
    retry: 1,
  });

  return {
    status: query.data?.status || (query.isLoading ? 'checking' : 'offline'),
    baseUrl: query.data?.baseUrl || 'https://chunavjsx.onrender.com',
    latencyMs: query.data?.latencyMs,
    message: query.data?.message,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    data: query.data,
  };
}
