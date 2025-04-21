import { type QueryClientConfig } from '@tanstack/react-query';

export const QueryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
};
