"use client";
import halfBackground from "@/assets/images/half_background.png";
import hero2Image from "@/assets/images/hero2.png";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchJobHeader = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q")?.toString() ?? "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    // [::] TODO : have to implement debounce
    replace(`${pathname}?${params.toString()}`);
  }, [searchQuery]);

  return (
    <div
      className="container flex h-[21rem] items-end justify-center bg-cover bg-no-repeat pb-6 sm:px-5 md:px-10 lg:px-20"
      style={{ backgroundImage: `url(${halfBackground.src})` }}
    >
      <div className="flex w-[95%] rounded-md bg-white p-5 text-2xl sm:w-[80%]">
        <div className="flex w-full flex-col items-start pt-5 text-start">
          <div>Projects List</div>
          <h1 className="mt-2 text-sm font-normal text-[#797979]">
            Explore high-paying freelance opportunities and land your dream job now!
          </h1>
          <div className="mt-4 flex h-14 w-full items-center rounded-md bg-gray-50 p-3 shadow-md">
            <div className="flex w-full flex-row">
              <IoMdSearch className="h-6 w-6 text-[#797979]" />
              <input
                className="w-full bg-transparent px-3 text-base outline-none"
                placeholder="Search by Category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></input>
            </div>

            <button className="h-8 w-24 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-base font-semibold text-white">
              Search
            </button>
          </div>
        </div>
        <div className="relative hidden w-full lg:block">
          <Image
            src={hero2Image}
            alt="hero-image-2"
            className="absolute -bottom-12"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchJobHeader;
