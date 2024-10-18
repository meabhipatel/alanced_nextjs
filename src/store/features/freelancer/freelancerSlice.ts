import { createSlice } from "@reduxjs/toolkit";
import { handleFetchPendingHireRequestAsync } from "./freelancerApi";
import { IPendingHireRequest } from "@/interfaces/pendingHireRequest";

interface IInitialState {
  pendingHireRequest: {
    isLoading: boolean;
    error: string;
    data: {
      count: number;
      results: IPendingHireRequest[];
    };
  };
}

const initialState: IInitialState = {
  pendingHireRequest: {
    isLoading: false,
    error: "",
    data: {
      count: 0,
      results: [],
    },
  },
};

const freelancerSlice = createSlice({
  name: "freelancer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /** ---> Builder case for fetch Pending hire request  */
    builder
      .addCase(handleFetchPendingHireRequestAsync.pending, (state) => {
        state.pendingHireRequest.isLoading = true;
      })
      .addCase(handleFetchPendingHireRequestAsync.fulfilled, (state, actions) => {
        state.pendingHireRequest.isLoading = false;
        state.pendingHireRequest.data = actions.payload;
      })
      .addCase(handleFetchPendingHireRequestAsync.rejected, (state, actions) => {
        state.pendingHireRequest.isLoading = false;
        const payload = actions.payload as { message: string };
        state.pendingHireRequest.error = payload.message;
      });
  },
});

export default freelancerSlice.reducer;
