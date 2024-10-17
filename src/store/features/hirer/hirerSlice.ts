import { createSlice } from "@reduxjs/toolkit";
import { IInvitationDetails } from "@/interfaces/invitationDetails";
import { handleFetchFreelancerInvitationAsync, handleFetchHirerSelfProjetsAsync } from "./hirerApi";
import { IHirerSelfProject } from "@/interfaces/hirerSelfProject";

interface IInitialState {
  freelnacerInvitations: {
    isloading: boolean;
    error: string;
    data: {
      count: number;
      results: IInvitationDetails[];
    };
  };
  hirerSelfProjects: {
    isloading: boolean;
    error: string;
    data: {
      count: number;
      results: IHirerSelfProject[];
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
  hirerSelfProjects: {
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
    /** ---> Builder case for fetch freelancer invitations */
    builder
      .addCase(handleFetchFreelancerInvitationAsync.pending, (state) => {
        state.freelnacerInvitations.isloading = true;
      })
      .addCase(handleFetchFreelancerInvitationAsync.fulfilled, (state, actions) => {
        state.freelnacerInvitations.isloading = false;
        state.freelnacerInvitations.data = actions.payload;
      })
      .addCase(handleFetchFreelancerInvitationAsync.rejected, (state, actions) => {
        state.freelnacerInvitations.isloading = false;
        const payload = actions.payload as { message: string };
        state.freelnacerInvitations.error = payload.message;
      });
    /** ---> Builder case for fetch hirer self projects */
    builder
      .addCase(handleFetchHirerSelfProjetsAsync.pending, (state) => {
        state.hirerSelfProjects.isloading = true;
      })
      .addCase(handleFetchHirerSelfProjetsAsync.fulfilled, (state, actions) => {
        state.hirerSelfProjects.isloading = false;
        state.hirerSelfProjects.data = actions.payload;
      })
      .addCase(handleFetchHirerSelfProjetsAsync.rejected, (state, actions) => {
        state.hirerSelfProjects.isloading = false;
        const payload = actions.payload as { message: string };
        state.hirerSelfProjects.error = payload.message;
      });
  },
});

export default hirerSlice.reducer;
