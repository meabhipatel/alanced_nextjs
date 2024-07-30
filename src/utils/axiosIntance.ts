import axios from "axios";
import { NEXT_PUBLIC_API_BASE_URL } from "../config";

export const axiosIntance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
});
