import { useMutation } from "@tanstack/react-query";
import { createBooking, type CreateBookingPayload } from "@/lib/api/booking";

export function useCreateBooking() {
  return useMutation({
    mutationFn: (payload: CreateBookingPayload) => createBooking(payload),
  });
}
