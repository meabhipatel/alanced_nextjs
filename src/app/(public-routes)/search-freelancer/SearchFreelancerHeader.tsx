"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import halfBackground from "@/assets/images/half_background.png";
import { IoMdSearch } from "react-icons/io";
import hero2Image from "@/assets/images/hero2.png";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IProps {}

const SearchFreelancerHeader: FC<IProps> = () => {
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
    replace(`${pathname}?${params.toString()}`);
  }, [searchQuery]);

  return (
    <div
      className="container flex h-[21rem] items-end justify-center bg-cover bg-no-repeat pb-8 sm:px-5 md:px-10 lg:px-20"
      style={{ backgroundImage: `url(${halfBackground.src})` }}
    >
      <div className="flex w-[95%] rounded-md bg-white p-5 text-2xl sm:w-[80%]">
        <div className="flex w-full flex-col items-start pt-5">
          <h1>Find & Hire Freelancers</h1>
          <p className="mt-2 text-sm font-normal text-[#797979]">
            More than 10K expert freelancers are waiting for you
          </p>
          <div className="mt-4 flex h-14 w-full items-center rounded-md bg-gray-50 p-3 shadow-md">
            <div className="flex w-full flex-row">
              <IoMdSearch className="h-6 w-6 text-[#797979]" />
              <input
                className="w-full bg-transparent px-3 text-base outline-none"
                placeholder="Search by Category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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

export default SearchFreelancerHeader;
