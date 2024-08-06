import React from "react";
import Signup from "../Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup as a hirer",
  description:
    "The best platform for search and hire freelancer in the central india. let's signup as hirer.",
};

const HirerSignup = () => {
  return <Signup />;
};

export default HirerSignup;
