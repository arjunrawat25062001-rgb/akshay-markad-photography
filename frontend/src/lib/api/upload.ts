import { api, unwrapApiData } from "./api";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/api/admin/upload", formData);

  return unwrapApiData(response);
}
