import React from "react";
import { Metadata } from "next";
import ContactUs from "./ContactUs";

export const metadata: Metadata = {
  title: "Contact us | Alanced",
  description:
    "Feel free to contact us for any issue with our platform, or you want to convey any solution or problem  with us. at Alanced we take care of everything.",
};

const Page = () => {
  return <ContactUs />;
};

export default Page;
