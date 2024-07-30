import { axiosIntance } from "@/utils/axiosIntance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ILoginData {
  email: string;
  password: string;
}

export const handleLoginAsync = createAsyncThunk(
  "auth/login",
  async (data: ILoginData, { rejectWithValue }) => {
    try {
      const res = await axiosIntance.post("/account/login", data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);
