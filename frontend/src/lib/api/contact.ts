import { api, unwrapApiData } from "./api";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContact(payload: ContactPayload) {
  const response = await api.post("/api/contact", payload);
  return unwrapApiData<string>(response);
}
