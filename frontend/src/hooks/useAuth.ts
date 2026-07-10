import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "@/lib/api/auth";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation(({ username, password }: any) => api.login(username, password), {
    onSuccess: (data) => {
      qc.invalidateQueries(["portfolio"]);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation(() => api.logout(), {
    onSuccess: () => qc.clear(),
  });
}
