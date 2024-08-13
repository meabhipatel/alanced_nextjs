import React, { FC } from "react";
import { Metadata } from "next";
import SearchJob from "./SearchJob";

export const metadata: Metadata = {
  title: "Search Jobs at Alanced",
  description:
    "The best platform to search jobs and projects with ease where we take care of every things which you should avoid for wasting your time unnecessarily.",
};

interface IProps {
  searchParams: {
    q?: string;
    skills?: string | string[];
    category?: string | string[];
    explevel?: string | string[];
    city?: string | string[];
    rate?: string | string[];
    page?: string;
  };
}

const Page: FC<IProps> = ({ searchParams }) => {
  return <SearchJob searchParams={searchParams} />;
};

export default Page;
