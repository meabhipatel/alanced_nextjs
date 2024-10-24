import Image from "next/image";
import faq from "@/assets/images/faq.png";
import Faqs from "./Faqs";
import { faqList } from "@/constant/faqList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faq | Alanced",
  description: "Frequently asked questions which are asked to us at Alanced how we do the things.",
};

const FAQ = () => {
  return (
    <div className="container mb-4 px-4 py-5 sm:px-5 md:px-10 lg:px-20">
      <div className="max-h-screen overflow-y-auto">
        <div className="my-2 mb-5 mt-12 h-[500px] border border-gray-200 border-opacity-30 bg-[#FFFFFF] md:flex">
          {/* Image Section */}
          <div className="relative flex-1">
            <Image
              src={faq}
              alt="FAQ"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 px-3 py-4">
            <h1 className="font-cardo text-center text-[26px] font-normal text-[#031136]">
              Frequently Asked Questions
            </h1>

            <div className="relative mx-auto mb-5 mt-1 w-52">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>

            {/* FAQ Items */}
            <Faqs faqs={faqList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
