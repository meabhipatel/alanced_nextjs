import Link from "next/link";
import Image from "next/image";
import searchImage from "@/assets/images/search.png";
import createImage from "@/assets/images/create.png";
import earnImage from "@/assets/images/earn.png";
import moneyPotImage from "@/assets/images/moneyPot.png";
import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Why Alanced ",
  description:
    "The best platform for search and hire freelancer in the central india. let's have a tour of freelancers.",
};

const WhyAlanced = () => {
  return (
    <Fragment>
      <div className="container mt-12 px-5 sm:px-5 md:px-10 lg:px-20">
        {/* ---> Page header  */}
        <div className="flex items-center justify-between rounded border border-gray-200">
          <div className="w-full p-4 sm:basis-8/12 md:p-8">
            <h1 className="mt-6 text-left text-[26px] font-semibold text-blue-600">
              Connect with the worldwide job marketplace.{" "}
            </h1>
            <div className="relative mt-1 w-36">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <p className="mt-4 text-left text-[15px] opacity-[70%]">
              Are you prepared to take your business or career to new heights?
            </p>
            <div className="mt-3 flex flex-row">
              <Link href="/search-freelancer">
                <div className="basis-2/12">
                  <button className="mt-5 h-10 w-28 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-base font-semibold text-white">
                    Find Talent
                  </button>
                </div>
              </Link>
              <Link href="/search-job">
                <div className="ml-5 mt-5 rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                  <button className="rounded bg-[#f8faf9] px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-bold text-transparent">
                      Find Work
                    </p>
                  </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="mr-12 hidden w-40 sm:block">
            <Image
              src={searchImage}
              alt="search"
              className="mx-auto mb-[5%] mt-[6%] h-28 md:h-40"
            />
          </div>
        </div>

        {/* ---> Page section 1 */}
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:gap-10">
            <div className="w-40">
              <Image
                src={createImage}
                alt="create"
                className="mx-auto ml-1 h-36"
              />
            </div>
            <div className="mt-5 basis-9/12">
              <div className="text-left text-[22px] font-semibold">
                Create your profile (it’s free)
              </div>
              <p className="mb-5 mt-3 text-left text-[15px] opacity-50">
                Focus solely on the professional skills and experience that align with the job
                you’re pursuing. This is particularly beneficial if your skills and work history
                vary from your current career objectives, as it allows you to highlight the relevant
                expertise that hiring managers seek.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-10">
            <div className="w-40">
              <Image
                src={earnImage}
                alt="earn"
                className="mx-auto ml-1 h-32"
              />
            </div>
            <div className="mt-5 basis-9/12">
              <div className="text-left text-[22px] font-semibold">Foster financial growth</div>
              <p className="mb-5 mt-3 text-left text-[15px] opacity-50">
                “Foster financial growth” refers to intentional actions or strategies designed to
                nurture and promote the expansion of financial resources, investments, or wealth.
                This may include activities such as saving, investing, or seeking opportunities to
                boost income.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-10">
            <div className="w-40">
              <Image
                src={moneyPotImage}
                alt="money"
                className="mx-auto ml-1 h-32"
              />
            </div>
            <div className="mt-5 basis-9/12">
              <div className="text-left text-[22px] font-semibold">
                Safe and Reliable payment method.
              </div>
              <p className="mb-5 mt-3 text-left text-[15px] opacity-50">
                A secure and dependable payment method denotes a financial transaction process that
                protects sensitive information, including personal and financial details, while
                guaranteeing that payments are processed accurately and promptly.
              </p>
            </div>
          </div>
        </div>

        {/* ---> Page section 2 */}
        <div className="mt-12 flex flex-col gap-1 rounded border border-gray-200 md:flex-row">
          <div className="basis-6/12 border-gray-200 p-3 md:ml-16 md:border-r">
            <div className="mt-8 text-left text-[24px] font-semibold">
              Create a job posting and hire talent.
            </div>
            <div className="relative mt-2 w-32">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <div className="mt-3 text-left text-[18px] opacity-70">
              Discover the perfect talent match in our Talent <br />
              Marketplace.
            </div>
            <p className="mt-4 text-left text-[15px] opacity-70">
              Publish your job listing on the global job market and <br /> anticipate a wave of
              proposals from skilled <br /> individuals spanning the globe.
            </p>
            <p className="mt-4 text-left text-[15px] opacity-70">
              Our advanced algorithms help identify <br /> top candidates tailored to your needs.
              You have <br /> the chance to carefully review profiles, <br /> portfolios, and
              feedback before granting <br /> approval.
            </p>
            <div className="mb-8 text-left">
              {" "}
              <Link href="/search-freelancer">
                <span className="mr-2 mt-8 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-5 py-[10px] text-[16px] text-base font-semibold text-white">
                  Talents
                </span>
              </Link>
            </div>
          </div>
          <div className="basis-6/12 border-t p-3 md:ml-16">
            <div className="mt-8 text-left text-[24px] font-semibold">
              Explore projects and get opportunities.
            </div>
            <div className="relative mt-2 w-32">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <div className="mt-3 text-left text-[18px] opacity-70">
              Initiate essential tasks without delay using Project
              <br /> Catalog.
            </div>
            <p className="mt-4 text-left text-[15px] opacity-70">
              Immerse yourself in a world of projects and unlock rewarding opportunities. <br />{" "}
              Explore a realm of possibilities and start your journey towards new horizons. <br />{" "}
              Immerse yourself in a world of projects and unlock rewarding opportunities. <br />{" "}
              Explore a realm of possibilities and start your journey towards new horizons.
            </p>
            <p className="mt-4 text-left text-[15px] opacity-70">
              Our platform serves as a gateway to a variety of projects, where you can explore,
              engage, and <br /> embark on new ventures. Whether you&apos;re an experienced
              professional aiming to broaden your horizons or a <br /> new talent eager to leave
              your mark.
            </p>

            <div className="mb-8 text-left">
              <Link href="/search-job">
                <span className="mr-2 mt-8 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-7 py-[10px] text-[16px] text-base font-semibold text-white">
                  Works
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ---> Page section 3 */}
        <div className="mb-5 mt-12 flex flex-col-reverse md:flex-row">
          <div className="ml-4 basis-9/12">
            <div className="mt-6 text-left text-[26px] font-semibold">We are available 24/7</div>
            <div className="relative mt-2 w-32">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <p className="mt-4 text-left text-[15px] opacity-[70%]">
              We are always available, providing you with access to our services 24 hours a day, 7
              days a week. Whenever you require assistance, support, or have questions, we’re here
              to respond quickly, regardless of the time or day. Our dedication to continuous
              availability ensures that you can depend on us for help, guidance, and peace of mind
              at any hour, making your experience smooth and convenient.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WhyAlanced;
