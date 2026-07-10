import { useMutation } from "@tanstack/react-query";
import { sendContact, type ContactPayload } from "@/lib/api/contact";

export function useContact() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => sendContact(payload),
  });
}

export const useSendContact = useContact;
