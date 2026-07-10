import { api, setTokens, clearTokens, getAccessToken } from "./api";

export async function login(username: string, password: string) {
  const res = await api.post("/api/auth/login", { username, password });
  const payload = res.data?.data;
  if (payload?.accessToken) {
    setTokens(payload.accessToken, payload.refreshToken);
  }
  return payload;
}

export function logout() {
  const refreshToken = localStorage.getItem("app_refresh_token");
  clearTokens();
  if (refreshToken) {
    // fire and forget
    api.post("/api/auth/logout", { refreshToken }).catch(() => {});
  }
}

export function getCurrentAccess() {
  return getAccessToken();
}
