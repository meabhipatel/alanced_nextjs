import { axiosIntance } from "@/utils/axiosIntance";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
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

interface IGoogleLoginData {
  email: string;
  type: string;
}

export const handleLoginWithGoogleAsync = createAsyncThunk(
  "auth/google-login",
  async (data: IGoogleLoginData, { rejectWithValue }) => {
    try {
      const res = await axiosIntance.post("/account/google-login/", data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

export const handleGetUpdatedProfileAsync = createAsyncThunk(
  "auth/get-updated-profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosWithAuth.get("/account/freelancer/selfprofile/view");
      return res.data.data[0];
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);
