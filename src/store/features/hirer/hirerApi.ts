import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface IFetchFreelancerInvitationParams {
  query: string;
}

export const handleFetchFreelancerInvitationAsync = createAsyncThunk(
  "fetch/invited-freelancer",
  async (data: IFetchFreelancerInvitationParams, { rejectWithValue }) => {
    try {
      const res = await axiosWithAuth.get(`/freelance/View-all/invited-freelancers?${data.query}`);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

interface IFetchHirerSelfProjetsParams {
  query: string;
}

export const handleFetchHirerSelfProjetsAsync = createAsyncThunk(
  "fetch/hirer-self-projects",
  async (data: IFetchHirerSelfProjetsParams, { rejectWithValue }) => {
    try {
      const res = await axiosWithAuth.get(`/freelance/view/hirer-self/Project?${data.query}`);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);
