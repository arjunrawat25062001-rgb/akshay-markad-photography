const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

async function fetchJson(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, { ...opts, credentials: "include" });
  if (!res.ok) throw new Error(`Fetch error ${res.status} ${res.statusText}`);
  return res.json();
}

export async function listPortfolioServer(params: Record<string, any> = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => v !== undefined && qs.set(k, String(v)));
  return fetchJson(`/api/portfolio?${qs.toString()}`);
}

export async function getPortfolioBySlugServer(slug: string) {
  return fetchJson(`/api/portfolio/${encodeURIComponent(slug)}`);
}

export async function listCategoriesServer() {
  return fetchJson(`/api/portfolio/categories`);
}

export async function listAllPortfolioForSsg() {
  return fetchJson(`/api/portfolio?page=0&size=1000`);
}

export { fetchJson };
