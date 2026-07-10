import { api, unwrapApiData } from "./api";

export type CreateBookingPayload = {
  name: string;
  email: string;
  bookingDate: string;
  serviceId?: number | null;
};

export async function createBooking(payload: CreateBookingPayload) {
  const response = await api.post("/api/bookings", payload);
  return unwrapApiData<string>(response);
}
