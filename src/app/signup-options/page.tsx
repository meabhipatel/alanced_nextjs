import React from "react";
import SignupOptions from "./SignupOptions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Signup options - join as a freelancer or as a hirer",
  },
  description:
    "Alanced is the best platform for search and hire freelancer as well as get hired in the central india.",
};

const Page = () => {
  return <SignupOptions />;
};

export default Page;
