"use client";

import React, { FC, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

interface IProps {
  faqs: { question: string; answer: string }[];
}

const Faqs: FC<IProps> = ({ faqs }) => {
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="mx-2 mt-1 border border-gray-200 border-opacity-30 p-3"
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
    </>
  );
};

export default Faqs;
