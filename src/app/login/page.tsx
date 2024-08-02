import React from "react";
import { Metadata } from "next";
import Login from "./Login";

export const metadata: Metadata = {
  title: {
    absolute: "Login - Welcome back to the alanced",
  },
  description:
    "Login to the your best platform at Alanced where we take care of every things which you should avoid for wasting time unnecessarily.",
};

const Page = () => {
  return <Login />;
};

export default Page;
