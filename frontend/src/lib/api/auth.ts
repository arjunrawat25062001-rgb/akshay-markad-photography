import { api, clearAuthTokens, getAccessToken, getRefreshToken, setAuthTokens, unwrapApiData, withSkipAuthRefresh } from "./api";

export type LoginCredentials = {
  username: string;
  password: string;
};

export type AuthUser = {
  id: string | number;
  username?: string;
  email?: string;
  roles?: string[];
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  user?: AuthUser;
};

export async function login(username: string, password: string) {
  const response = await api.post("/api/auth/login", { username, password });
  const payload = unwrapApiData<AuthSession>(response);

  if (payload?.accessToken) {
    setAuthTokens(payload.accessToken, payload.refreshToken);
  }

  return payload;
}

export async function logout() {
  const refreshToken = getRefreshToken();
  clearAuthTokens();

  if (!refreshToken) {
    return;
  }

  await api.post("/api/auth/logout", { refreshToken }, withSkipAuthRefresh()).catch(() => undefined);
}

export function getCurrentAccess() {
  return getAccessToken();
}
