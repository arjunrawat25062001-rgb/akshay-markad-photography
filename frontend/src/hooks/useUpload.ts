import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/lib/api/upload";

export function useUploadImage() {
  return useMutation((file: File) => uploadImage(file));
}
