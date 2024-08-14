import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs | Alanced the best platform",
  description:
    "The best platform for search and hire freelancer in the central india. let's have a tour of freelancers.",
};

const page = () => {
  return (
    <div className="h-screen w-full">
      <iframe
        title="blogs of wiz 91 "
        src="https://wiz91.com/"
        width={"100%"}
        height={"100%"}
      ></iframe>
    </div>
  );
};

export default page;
