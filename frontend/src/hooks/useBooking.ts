import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/lib/api/booking";

export function useCreateBooking() {
  return useMutation((payload: any) => createBooking(payload));
}
