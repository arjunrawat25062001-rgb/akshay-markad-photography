import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, type LoginCredentials } from "@/lib/api/auth";
import { queryKeys } from "@/lib/react-query/query-keys";
import { createClearCacheSuccessHandler } from "@/lib/react-query/mutation-helpers";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: LoginCredentials) => login(username, password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: createClearCacheSuccessHandler(queryClient),
  });
}
