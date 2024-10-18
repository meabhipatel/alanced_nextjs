import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface IFetchPendingHireRequestParams {
  page: number;
}

export const handleFetchPendingHireRequestAsync = createAsyncThunk(
  "fetch/pending-hire-request",
  async (data: IFetchPendingHireRequestParams, { rejectWithValue }) => {
    try {
      const res = await axiosWithAuth.get(
        `/freelance/View-all/pending-hire-request?page=${data.page}`
      );
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);
