import React from "react";
import Signup from "../Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup as a freelancer",
  description:
    "The best platform for search and hire freelancer in the central india. let's signup as freelancer.",
};

const FreelancerSignup = () => {
  return <Signup />;
};

export default FreelancerSignup;
