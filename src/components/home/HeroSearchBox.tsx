"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

import { IoMdSearch } from "react-icons/io";

const HeroSearchBox = () => {
  const [searchType, setSearchType] = useState("Talent");

  const handleSearchTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="-mt-[57px] flex w-[90%] flex-col items-center gap-3 rounded-2xl bg-white p-2 shadow-lg md:h-24 md:flex-row lg:w-[80%]">
          <div className="flex w-full justify-center md:block md:w-[60%]">
            <Link href={searchType === "Talent" ? "/search-freelancer" : "/search-job"}>
              <div className="flex cursor-text flex-row items-center gap-3 border-r-[#1C3865] p-4 md:border-r-2">
                <IoMdSearch className="h-5 w-5 text-[#797979]" />
                <p className="text-xs text-gray-500 lg:text-base">
                  {searchType === "Talent"
                    ? "Search for the best freelancers in one place."
                    : "Finding the best freelance jobs according your skills "}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex w-full items-center justify-center gap-3 md:w-[40%]">
            <div>
              <select
                className="block h-12 w-28 rounded-lg bg-gray-100 p-2.5 text-sm font-normal text-[#797979]"
                onChange={handleSearchTypeChange}
              >
                <option value="Talent">Talent</option>
                <option value="Jobs">Jobs</option>
              </select>
            </div>
            <div className="">
              <Link
                href={{
                  pathname: searchType === "Talent" ? "/search-freelancer" : "/search-job",
                }}
              >
                <button className="h-12 w-28 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-semibold text-white">
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSearchBox;
