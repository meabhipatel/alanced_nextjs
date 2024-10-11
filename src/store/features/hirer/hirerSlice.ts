import { createSlice } from "@reduxjs/toolkit";
import { IInvitationDetails } from "@/interfaces/invitationDetails";
import { handleFetchFreelancerInvitationAsync } from "./hirerApi";

interface IInitialState {
  freelnacerInvitations: {
    isloading: boolean;
    error: string;
    data: {
      count: number;
      results: IInvitationDetails[];
    };
  };
}

const initialState: IInitialState = {
  freelnacerInvitations: {
    isloading: false,
    error: "",
    data: {
      count: 0,
      results: [],
    },
  },
};

const hirerSlice = createSlice({
  name: "hirer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(handleFetchFreelancerInvitationAsync.pending, (state) => {
      state.freelnacerInvitations.isloading = true;
    });
    builder.addCase(handleFetchFreelancerInvitationAsync.fulfilled, (state, actions) => {
      state.freelnacerInvitations.isloading = false;
      state.freelnacerInvitations.data = actions.payload;
    });
    builder.addCase(handleFetchFreelancerInvitationAsync.rejected, (state, actions) => {
      state.freelnacerInvitations.isloading = false;
      const payload = actions.payload as { message: string };
      state.freelnacerInvitations.error = payload.message;
    });
  },
});

export default hirerSlice.reducer;
