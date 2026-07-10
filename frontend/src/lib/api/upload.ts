import { api } from "./api";

export async function uploadImage(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await api.post("/api/admin/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
  return res.data?.data || res.data;
}
