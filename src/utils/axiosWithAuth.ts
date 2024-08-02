import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "@/config";
import cookies from "js-cookie";

export const axiosWithAuth = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
});

axiosWithAuth.interceptors.request.use((req) => {
  const token = cookies.get("token");
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});
