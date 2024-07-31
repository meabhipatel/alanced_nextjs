"use client";
import { ELoginMethod, EUserType, setUserAuthProfile } from "@/store/features/auth/authSlice";
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
    const loginMethod = localStorage.getItem("@loginMethod") as ELoginMethod;
    const userType = localStorage.getItem("@userType") as EUserType;

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
