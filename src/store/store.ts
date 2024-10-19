import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import hirerSlice from "./features/hirer/hirerSlice";
import freelancerSlice from "./features/freelancer/freelancerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      hirer: hirerSlice,
      freelancer: freelancerSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
