import PrivacyPolicy from "./PrivacyPolicy";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alanced",
  description:
    "Read our privacy policy at Alanced how we work and what we do with the information we collect and how we use your information",
};

const Page = () => {
  return (
    <div className="container sm:px-5 md:px-10 lg:px-20">
      <div className="font-inter text-center text-lg font-bold text-[#031136]">
        <h1>Privacy Policy</h1>
      </div>

      <PrivacyPolicy />
    </div>
  );
};

export default Page;
