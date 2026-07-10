import { QueryClient, type QueryKey } from "@tanstack/react-query";

export async function invalidateQueryKeys(queryClient: QueryClient, queryKeys: QueryKey[]) {
  await Promise.all(queryKeys.map((queryKey) => queryClient.invalidateQueries({ queryKey })));
}

export function createInvalidateSuccessHandler(queryClient: QueryClient, queryKeys: QueryKey[]) {
  return async () => {
    await invalidateQueryKeys(queryClient, queryKeys);
  };
}

export function createClearCacheSuccessHandler(queryClient: QueryClient) {
  return async () => {
    await queryClient.clear();
  };
}
