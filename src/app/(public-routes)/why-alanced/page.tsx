import Link from "next/link";
import Image from "next/image";
import searchImage from "@/assets/images/search.png";
import createImage from "@/assets/images/create.png";
import earnImage from "@/assets/images/earn.png";
import moneyPotImage from "@/assets/images/moneyPot.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Alanced ",
  description:
    "The best platform for search and hire freelancer in the central india. let's have a tour of freelancers.",
};

const WhyAlanced = () => {
  return (
    <>
      <div className="mt-12 px-5 lg:px-32">
        {/* ---> Page header  */}
        <div className="flex items-center justify-between rounded border border-gray-200">
          <div className="w-full p-4 sm:basis-8/12 md:p-8">
            <h1 className="mt-6 text-left text-[26px] font-semibold text-blue-600">
              Engage with the global job marketplace platform.
            </h1>
            <div className="relative mt-1 w-36">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
              <div className="rounded-lg border-b-2 border-gray-600"></div>
            </div>
            <p className="mt-4 text-left text-[15px] opacity-[70%]">
              Are you ready to elevate your business or career to the next level?
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
                Include only your professional skills and experience that are relevant to the job
                you&apos;re targeting. This is especially helpful if your skills and work history
                differ from your current career goals because it enables you to showcase the related
                expertise that hiring managers are looking for.
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
              <h1 className="text-left text-[22px] font-semibold">Foster financial growth</h1>
              <p className="mb-5 mt-3 text-left text-[15px] opacity-50">
                Foster financial growth&quot; refers to the deliberate actions or strategies aimed
                at nurturing and encouraging the expansion of one&apos;s financial resources,
                investments, or wealth. This can involve activities such as saving, investing, or
                pursuing opportunities to increase income.
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
                A secure and reliable payment method refers to a financial transaction process that
                safeguards sensitive data, such as personal and financial information, while
                ensuring that payments are processed accurately and in a timely manner.
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
              proposals from skilled
              <br /> individuals spanning the globe
            </p>
            <p className="mt-4 text-left text-[15px] opacity-70">
              Our cutting-edge algorithms assist in identifying <br /> top candidates tailored to
              your needs.You have <br /> the opportunity to thoroughly review profiles,
              <br /> portfolios, and feedback before granting
              <br /> approval.
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
              Dive into a world of projects and unlock valuable work.
              <br /> discover a realm of possibilities and embark on <br />
              your journey to new horizons.
            </p>
            <p className="mt-4 text-left text-[15px] opacity-70">
              Our platform offers a gateway to a world of diverse <br />
              projects, where you can explore, engage, and <br />
              embark on new ventures. Whether you&apos;re a seasoned
              <br /> professional looking to expand your horizons or a<br /> fresh talent eager to
              make your mark.
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
              Our availability is unwavering, ensuring your access to our services around the clock,
              24 hours a day, 7 days a week. Whenever you need assistance, support, or have
              inquiries, we&apos;re here to respond promptly, no matter the time or day. Our
              commitment to round-the-clock availability means you can rely on us for assistance,
              guidance, and peace of mind at any hour, making your experience seamless and
              convenient.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyAlanced;
