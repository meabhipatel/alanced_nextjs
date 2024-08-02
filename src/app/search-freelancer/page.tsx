import React from "react";
import { Metadata } from "next";
import SearchFreelancer from "./SearchFreelancer";

export const metadata: Metadata = {
  title: "Search Freelancer at Alanced",
  description:
    "The best platform to search freelancer where we take care of every things which you should avoid for wasting your time unnecessarily.",
};

const Page = () => {
  return <SearchFreelancer />;
};

export default Page;
