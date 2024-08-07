import Image from "next/image";
import Link from "next/link";
import girlimg from "@/assets/images/enterprisesgirl.png";
import menImage from "@/assets/images/enterprisesman.png";
import womenTalk from "@/assets/images/WomanTalk.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprises | Alanced",
  description:
    "Choose Alanced as you enterprise resource is the best choice you will ever make. at Alanced everyone it would be freelancer, hirer or any enterprise we take care of all.",
};

const Enterprises = () => {
  return (
    <>
      <div className="mt-10 px-5 lg:px-32">
        <div className="flex flex-col-reverse rounded-lg border border-gray-200 border-opacity-50 bg-[#dcf7ea] md:flex-row">
          <div className="basis-6/12 p-3 text-left md:mt-8 md:pl-8">
            <h1 className="text-[22px] font-bold text-blue-700">Alanced</h1>
            <div className="relative mt-1 w-20">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <h1 className="mt-5 text-[35px] font-semibold text-blue-600">Your Trusted</h1>
            <h1 className="text-[28px] font-semibold text-blue-600">Partner For Design And</h1>
            <h1 className="text-[28px] font-semibold text-blue-600">Web Development.</h1>
            <p className="mt-8 text-[16px] font-normal opacity-50">
              Count on us for ongoing maintenance and support, <br />
              ensuring your website stays secure.
            </p>
            <Link href="/signup-options">
              <span className="ml-8 mr-2 mt-8 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                Let&apos;s Connect
              </span>
            </Link>
          </div>
          <div className="basis-6/12">
            <Image
              src={girlimg}
              alt="girl-image"
              layout="responsive"
              className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover md:rounded-br-lg md:rounded-tl-none"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <h1 className="mt-5 text-[30px] font-semibold">Key Features</h1>
          </div>
          <div className="relative mx-auto mt-1 w-24">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
            <div className="rounded-lg border-b-2 border-gray-600"></div>
          </div>
          <div className="mt-10 flex flex-col gap-2 md:flex-row">
            <div className="basis-3/12 rounded-lg border border-blue-200 border-opacity-50 bg-[#daf6f8] p-3 shadow-md">
              <div className="text-left text-2xl">
                <i className="bi bi-boxes"></i>
              </div>
              <h1 className="mt-2 text-left text-[26px]">Talent</h1>
              <p className="mt-3 text-left text-[18px]">
                Unleash our exceptional talent to fuel your project&apos;s success.
              </p>
              <div className="mt-3 text-left">
                <Link href="/search-freelancer">
                  <span className="mr-2 mt-4 inline-block rounded border border-none bg-[#84d6fc] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
            <div className="basis-3/12 rounded-lg border border-blue-200 border-opacity-50 bg-[#e6ebfc] p-3 shadow-md">
              <div className="text-left text-2xl">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h1 className="mt-2 text-left text-[26px]">Security</h1>
              <p className="mt-3 text-left text-[18px]">
                Protecting your digital assets with state-of-the-art security solutions.
              </p>
              <div className="mt-3 text-left">
                <Link href="/safety-security">
                  <span className="mr-2 mt-4 inline-block rounded border border-none bg-[#c2b4fc] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
            <div className="basis-3/12 rounded-lg border border-blue-200 border-opacity-50 bg-[#e3f7e9] p-3 shadow-md">
              <div className="text-left text-2xl">
                <i
                  className="fa fa-file-pdf-o"
                  aria-hidden="true"
                ></i>
              </div>
              <h1 className="mt-2 text-left text-[26px]">Work</h1>
              <p className="mt-3 text-left text-[18px]">
                Your go-to partner for exceptional web development and design.
              </p>
              <div className="mt-3 text-left">
                <Link href="/about-us">
                  <span className="mr-2 mt-4 inline-block rounded border border-none bg-[#96dbb7] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
            <div className="basis-3/12 rounded-lg border border-blue-200 border-opacity-50 bg-[#f5f5f4] p-3 shadow-md">
              <div className="text-left text-2xl">
                <i className="bi bi-geo-alt"></i>
              </div>
              <h1 className="mt-2 text-left text-[26px]">Centralized Hub</h1>
              <p className="mt-3 text-left text-[18px]">
                A centralized hub is a single point of control or coordination.
              </p>
              <div className="mt-3 text-left">
                <Link href="/">
                  <span className="mr-2 mt-4 inline-block rounded border border-none bg-[#cacab9] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                    View Features
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col rounded-lg border border-gray-200 border-opacity-50 md:mt-16 md:flex-row">
          <div className="basis-6/12">
            <Image
              src={menImage}
              alt="men-image"
              layout="responsive"
              className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover md:rounded-bl-lg md:rounded-tr-none"
            />
          </div>
          <div className="basis-6/12 p-3 text-left md:mt-8 md:pl-8">
            <h1 className="text-[30px] font-semibold">How It Works</h1>
            <div className="relative mt-1 w-20">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <h1 className="mt-5 text-[25px] font-semibold">Client</h1>
            <p className="mt-4 text-[16px] font-normal opacity-50">
              The client uses the web-based user interface of the system to enter the required data.
            </p>
            <h1 className="mt-4 text-[25px] font-semibold">System</h1>
            <p className="mt-4 text-[16px] font-normal opacity-50">
              The system processes the entered data, performs necessary calculations or checks, and
              stores the results.
            </p>
            <h1 className="mt-4 text-[25px] font-semibold">Output</h1>
            <p className="mt-4 text-[16px] font-normal opacity-50">
              The system provides feedback to the client through the web-based user interface,
              showing the results of the processed data.
            </p>
            <Link href="/signup-options">
              <span className="ml-8 mr-2 mt-8 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                Let&apos;s Connect
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-gray-200 border-opacity-50 bg-[#e9e7f9]">
          <div className="flex flex-col-reverse md:flex-row">
            <div className="basis-6/12 p-3 text-left md:mt-8 md:pl-8">
              <h1 className="text-[25px] font-semibold text-blue-700">What are you waiting for?</h1>
              <div className="relative mt-1 w-20">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
              <h1 className="mt-5 text-[30px] font-semibold text-blue-600">Take the first step</h1>
              <h1 className="text-[30px] font-semibold text-blue-600">towards a brighter future</h1>
              <p className="mt-8 text-[16px] font-normal opacity-50">
                Don&apos;t delay, take the first step towards a brighter future by joining our
                platform and discovering endless possibilities for your projects.
              </p>
              <Link href="/signup-options">
                <span className="ml-8 mr-2 mt-8 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Let&apos;s Connect
                </span>
              </Link>
            </div>
            <div className="basis-6/12">
              <Image
                src={womenTalk}
                alt="women-talk"
                layout="responsive"
                className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover md:rounded-bl-lg md:rounded-tr-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enterprises;
