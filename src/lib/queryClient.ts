/**
 * Centralized React Query exports and helpers.
 * Keeps all direct `@tanstack/react-query` imports in one place
 * so the rest of the application imports from this module.
 */

import {
  QueryClient,
  QueryClientProvider,
  useQuery as useTanstackQuery,
  // re-export anything else you need from react-query here
} from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });
}

export { QueryClient, QueryClientProvider };
export const useQuery = useTanstackQuery;
