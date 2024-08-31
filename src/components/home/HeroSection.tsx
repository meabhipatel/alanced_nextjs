import heroBackground from "@/assets/images/hero_background.svg";

import heroImage from "@/assets/images/hero1.png";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <div
        className="flex h-[110vh] justify-center bg-cover px-5"
        style={{ backgroundImage: `url(${heroBackground.src})` }}
      >
        <div className="pt-28 text-left sm:pt-40">

          <h6 className="mt-2 text-[50px] font-semibold leading-[67.7px] text-[#031136]">
          Unlock Access <br /> to Premier Experts <br /> and Talent with Alanced
          </h6>
          <h1 className="mb-3.5 mt-6 text-[16px] font-normal leading-[26px] text-[#797979]">
            With the largest professional creative community online, simply <br /> search through
            from our website
          </h1>
          <Link href={"/signup-options"}>
            <span className="mr-2 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
              Get Started
            </span>
          </Link>
        </div>
        <div className="hidden h-[42rem] w-[50%] pt-16 lg:block">
          <Image
            src={heroImage}
            alt="hero-image"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
