import { api } from "./api";

export async function createBooking(payload: any) {
  const res = await api.post("/api/bookings", payload);
  return res.data?.data || res.data;
}
