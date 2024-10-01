"use client";
import React, { FC, ReactNode, useLayoutEffect, useState } from "react";
import { ELoginMethod, EUserType, setUserAuthProfile } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import AlancdLogo from "@/assets/images/alanced.png";

interface IProps {
  children: ReactNode;
}

const AuthProvider: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

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
    setIsInitialized(true);
  }, []);
  if (!isInitialized) {
    return (
      <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <Image
          src={AlancdLogo}
          alt="alanced logo"
          width={50}
          height={50}
          className="animate-pulse"
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
