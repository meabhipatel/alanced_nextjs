"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import faq from "@/assets/images/faq.png";
import { FaQuestionCircle } from "react-icons/fa";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

const FAQ = () => {
  // State and refs
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
        contentRef.current.style.overflowY = "auto";
      } else {
        contentRef.current.style.overflowY = "hidden";
      }
    }
  }, [isOpen]);

  const toggleOpen = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div className="mx-[9%] mt-2">
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
        <div
          ref={contentRef}
          className="flex-1 px-3 py-4"
        >
          <h1 className="font-cardo text-center text-[26px] font-normal text-[#031136]">
            Frequently Asked Questions
          </h1>

          <div className="relative mx-auto mt-1 w-52">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
            <div className="rounded-lg border-b-2 border-gray-600"></div>
          </div>

          {/* FAQ Items */}
          {[
            {
              question: "What is Alanced?",
              answer:
                "Alanced is a curated platform that connects skilled freelancers with clients in need of professional services. From writers and designers to coders and consultants, Alanced is your one-stop-shop for all freelancing needs.",
            },
            {
              question: "How do I sign up?",
              answer:
                "To register, click on the 'Sign Up' button on the top-right corner of our homepage, and follow the prompts. We offer separate registration processes for freelancers and clients to cater to the unique needs of both.",
            },
            {
              question: "How much does it cost to use Alanced?",
              answer:
                "For freelancers, there's a basic free plan available with a limited set of features. We also offer premium memberships with more benefits. Clients can post jobs for free but have optional premium features to boost their listings.",
            },
            {
              question: "How do I get paid?",
              answer:
                "Payments are processed through Alanced's secure payment gateway. Once a job is completed and approved by the client, funds are released to the freelancer's Alanced account, which can then be withdrawn to their bank or through other payment methods available.",
            },
            {
              question: "What kind of jobs can I find or post on Alanced?",
              answer:
                "We cover a wide range of categories, from writing, graphic design, web development, marketing, consulting, and many more. If you have a skill or a job requirement, it's likely you'll find a match here.",
            },
            {
              question: "Is my personal information safe with Alanced?",
              answer:
                "Absolutely. We prioritize the security and confidentiality of our users. All personal information is encrypted and kept secure. We do not share or sell user information to third parties.",
            },
            {
              question: "Can I work or hire from anywhere in the world?",
              answer:
                "Yes! Alanced is a global platform, and we support freelancers and clients from all over the world.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="mx-6 mt-1 border border-gray-200 border-opacity-30 p-3"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-inter text-md text-left font-semibold text-[#031136]">
                  <FaQuestionCircle className="mr-1 inline-block text-blue-700" />
                  {faq.question}
                </h1>
                <button
                  onClick={() => toggleOpen(index)}
                  onKeyDown={(e) => e.key === "Enter" && toggleOpen(index)}
                  className="pl-0.4 flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white pb-1"
                  aria-expanded={isOpen === index}
                  aria-controls={`faq-content-${index}`}
                  aria-label={isOpen === index ? "Collapse" : "Expand"}
                >
                  <div className="mt-1">
                    {isOpen === index ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
                  </div>
                </button>
              </div>
              {isOpen === index && (
                <div
                  id={`faq-content-${index}`}
                  className="font-inter py-3 text-left text-sm font-normal text-[#031136] opacity-40"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
