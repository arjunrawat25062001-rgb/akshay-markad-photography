import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

const KEY_ACCESS = "app_access_token";
const KEY_REFRESH = "app_refresh_token";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function getAccessToken(): string | null {
  try {
    return localStorage.getItem(KEY_ACCESS);
  } catch (e) {
    return null;
  }
}

function getRefreshToken(): string | null {
  try {
    return localStorage.getItem(KEY_REFRESH);
  } catch (e) {
    return null;
  }
}

function setTokens(access: string, refresh?: string) {
  try {
    localStorage.setItem(KEY_ACCESS, access);
    if (refresh) localStorage.setItem(KEY_REFRESH, refresh);
  } catch (e) {}
}

function clearTokens() {
  try {
    localStorage.removeItem(KEY_ACCESS);
    localStorage.removeItem(KEY_REFRESH);
  } catch (e) {}
}

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(instance(originalRequest));
          });
        });
      }
      isRefreshing = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        return Promise.reject(error);
      }
      try {
        const resp = await axios.post(`${API_BASE}/api/auth/refresh`, { refreshToken });
        const data = resp.data && resp.data.data;
        const newAccess = data?.accessToken;
        const newRefresh = data?.refreshToken;
        if (newAccess) setTokens(newAccess, newRefresh);
        onRefreshed(newAccess);
        isRefreshing = false;
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (e) {
        isRefreshing = false;
        clearTokens();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export { instance as api, setTokens, clearTokens, getAccessToken, getRefreshToken };
