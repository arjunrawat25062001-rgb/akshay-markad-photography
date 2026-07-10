import { useMutation } from "@tanstack/react-query";
import { sendContact } from "@/lib/api/contact";

export function useSendContact() {
  return useMutation((payload: any) => sendContact(payload));
}
