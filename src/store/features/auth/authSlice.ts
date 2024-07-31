import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { handleLoginAsync } from "./authApi";
import { IUserProfile } from "@/interfaces";
import cookies from "js-cookie";

const userProfileObj = {
  id: 0,
  first_Name: "",
  last_Name: "",
  email: "",
  contact: "",
  Address: "",
  images_logo: "",
  social_media: "",
  skills: "",
  about: "",
  DOB: "",
  gender: "",
  map: "",
  experience: 0,
  qualification: "",
  category: "",
  Language: "",
  hourly_rate: 0,
  experience_level: "",
};

interface IInitialState {
  isLoggedIn: boolean;
  isloading: boolean;
  error: string;
  userProfile: IUserProfile;
  userType: "HIRER" | "FREELANCER";
  loginMethod: "traditional" | "google";
}

// const localUserProfile = localStorage.getItem("@userProfile");
// const userProfile = localUserProfile
//   ? (JSON.parse(localUserProfile) as IUserProfile)
//   : userProfileObj;

const initialState: IInitialState = {
  isLoggedIn: false,
  isloading: false,
  error: "",
  userProfile: userProfileObj,
  userType: "FREELANCER",
  loginMethod: "traditional",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setUserAuthProfile: (state, action) => {
      state.isLoggedIn = true;
      state.userProfile = action.payload.userProfile;
      state.loginMethod = action.payload.userProfile;
      state.userType = action.payload.userType;
    },
    handleLogoutUserAction: (state) => {
      state.isLoggedIn = false;
      state.userProfile = userProfileObj;
      state.loginMethod = "traditional";
      state.userType = "FREELANCER";
    },
  },
  extraReducers(builder) {
    builder.addCase(handleLoginAsync.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(handleLoginAsync.fulfilled, (state, actions) => {
      state.isloading = false;
      state.isLoggedIn = true;
      const userType = actions.payload.data.type;
      const userProfile = actions.payload.data.login_data as IUserProfile;
      state.userType = userType;
      state.userProfile = userProfile;
      localStorage.setItem("@userType", userType);
      localStorage.setItem("@userProfile", JSON.stringify(userProfile));
      localStorage.setItem("@accessToken", actions.payload.data.token.access);
      cookies.set("token", actions.payload.data.token.access);
    });
    builder.addCase(handleLoginAsync.rejected, (state, actions) => {
      state.isloading = false;
      const payload = actions.payload as { message: string };
      state.error = payload.message;
    });
  },
});

export const { setIsLoggedIn, setUserAuthProfile, handleLogoutUserAction } = authSlice.actions;
export default authSlice.reducer;
