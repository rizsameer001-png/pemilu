export interface NetInfoState {
  type: string;
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  details: any;
}

export function fetch(): Promise<NetInfoState> {
  const isConnected = typeof navigator !== 'undefined' ? navigator.onLine : true;
  return Promise.resolve({
    type: 'wifi',
    isConnected,
    isInternetReachable: isConnected,
    details: {},
  });
}

export function addEventListener(listener: (state: NetInfoState) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleOnline = () => {
    listener({
      type: 'wifi',
      isConnected: true,
      isInternetReachable: true,
      details: {},
    });
  };

  const handleOffline = () => {
    listener({
      type: 'none',
      isConnected: false,
      isInternetReachable: false,
      details: {},
    });
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

export default {
  fetch,
  addEventListener,
};
