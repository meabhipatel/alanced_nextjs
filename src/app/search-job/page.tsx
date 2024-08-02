import React from "react";
import { Metadata } from "next";
import SearchJob from "./SearchJob";

export const metadata: Metadata = {
  title: "Search Jobs at Alanced",
  description:
    "The best platform to search jobs and projects with ease where we take care of every things which you should avoid for wasting your time unnecessarily.",
};

const Page = () => {
  return <SearchJob />;
};

export default Page;
