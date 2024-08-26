import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs | Alanced the best platform",
  description:
    "The best platform for search and hire freelancer in the central india. let's have a tour of freelancers.",
};

const page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h1 className="text-3xl font-semibold">Blogs </h1>
    </div>
  );
};

export default page;
