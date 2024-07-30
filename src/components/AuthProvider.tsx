"use client";
import { setUserAuthProfile } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { FC, ReactNode, useLayoutEffect } from "react";

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const accessToken = localStorage.getItem("@accessToken");
    const userProfile = localStorage.getItem("@userProfile");
    const loginMethod = localStorage.getItem("@loginMethod");
    const userType = localStorage.getItem("@userType");

    if (accessToken && userProfile && loginMethod && userType) {
      dispatch(
        setUserAuthProfile({
          userProfile: JSON.parse(userProfile),
          loginMethod: loginMethod,
          userType: userType,
        })
      );
    }
  }, []);

  return children;
};

export default AuthProvider;
