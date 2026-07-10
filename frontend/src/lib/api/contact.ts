import { api } from "./api";

export async function sendContact(payload: any) {
  const res = await api.post("/api/contact", payload);
  return res.data?.data || res.data;
}
