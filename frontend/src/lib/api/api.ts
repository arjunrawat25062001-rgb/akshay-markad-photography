import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8080";

export const AUTH_ACCESS_TOKEN_KEY = "app_access_token";
export const AUTH_REFRESH_TOKEN_KEY = "app_refresh_token";
export const AUTH_LOGOUT_EVENT = "app:auth-logout";

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data: T;
};

export type ApiErrorShape = {
  message: string;
  status?: number;
  code?: string;
  data?: unknown;
};

export class ApiError extends Error {
  status?: number;
  code?: string;
  data?: unknown;

  constructor(message: string, details: ApiErrorShape = { message }) {
    super(message);
    this.name = "ApiError";
    this.status = details.status;
    this.code = details.code;
    this.data = details.data;
  }
}

type RetryableRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
};

type TokenPair = {
  accessToken: string;
  refreshToken?: string;
};

const authApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function isBrowser() {
  return typeof window !== "undefined";
}

function getStoredValue(key: string) {
  if (!isBrowser()) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredValue(key: string, value: string) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors so API calls can continue.
  }
}

function removeStoredValue(key: string) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage errors so API calls can continue.
  }
}

export function getAccessToken() {
  return getStoredValue(AUTH_ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return getStoredValue(AUTH_REFRESH_TOKEN_KEY);
}

export function setAuthTokens(accessToken: string, refreshToken?: string) {
  setStoredValue(AUTH_ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    setStoredValue(AUTH_REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearAuthTokens() {
  removeStoredValue(AUTH_ACCESS_TOKEN_KEY);
  removeStoredValue(AUTH_REFRESH_TOKEN_KEY);
}

export function emitAuthLogout() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const response = error.response;
    const responseData = response?.data as Partial<ApiEnvelope<unknown>> & { message?: string } | undefined;
    const message =
      responseData?.message ||
      (typeof responseData?.data === "string" ? responseData.data : undefined) ||
      error.message ||
      "Request failed";

    return new ApiError(message, {
      message,
      status: response?.status,
      code: responseData && "code" in responseData ? String((responseData as { code?: string }).code) : error.code,
      data: responseData?.data ?? responseData,
    });
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError("Unexpected API error");
}

export function getApiErrorMessage(error: unknown) {
  return normalizeApiError(error).message;
}

export function unwrapApiData<T>(response: { data: T | ApiEnvelope<T> }) {
  const payload = response.data as T | ApiEnvelope<T>;

  if (payload && typeof payload === "object" && "data" in payload && ("success" in payload || "message" in payload)) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}

let refreshPromise: Promise<TokenPair | null> | null = null;

async function refreshAuthTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    clearAuthTokens();
    emitAuthLogout();
    return null;
  }

  if (!refreshPromise) {
    refreshPromise = authApi
      .post<ApiEnvelope<{ accessToken: string; refreshToken: string }>>(
        "/api/auth/refresh",
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      )
      .then((response) => {
        const payload = unwrapApiData(response);
        if (!payload?.accessToken) {
          throw new ApiError("Token refresh did not return an access token");
        }

        setAuthTokens(payload.accessToken, payload.refreshToken);
        return payload;
      })
      .catch((error) => {
        clearAuthTokens();
        emitAuthLogout();
        throw normalizeApiError(error);
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const normalizedError = normalizeApiError(error);
    const originalRequest = error?.config as RetryableRequestConfig | undefined;
    const status = normalizedError.status;
    const shouldRefresh = status === 401 && originalRequest && !originalRequest._retry && !originalRequest.skipAuthRefresh && !String(originalRequest.url || "").includes("/api/auth/refresh");

    if (!shouldRefresh) {
      return Promise.reject(normalizedError);
    }

    originalRequest._retry = true;

    try {
      const refreshedTokens = await refreshAuthTokens();
      if (!refreshedTokens?.accessToken) {
        throw normalizedError;
      }

      originalRequest.headers = originalRequest.headers ?? {};
      (originalRequest.headers as Record<string, string>).Authorization = `Bearer ${refreshedTokens.accessToken}`;

      return api.request(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();
      emitAuthLogout();
      return Promise.reject(normalizeApiError(refreshError));
    }
  },
);

export function withSkipAuthRefresh<T extends AxiosRequestConfig>(config?: T): T & { skipAuthRefresh: true } {
  return {
    ...(config ?? {}),
    skipAuthRefresh: true,
  } as T & { skipAuthRefresh: true };
}

export { authApi, clearAuthTokens as clearTokens, getRefreshToken as getStoredRefreshToken, setAuthTokens as setTokens };
