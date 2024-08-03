import Link from "next/link";
import Image from "next/image";
import admistrativeImage from "@/assets/images/admistrative.png";
import businessImage from "@/assets/images/business.png";
import designImage from "@/assets/images/design.png";
import educationImage from "@/assets/images/education.png";
import engineerImage from "@/assets/images/engineer.png";
import programmingImage from "@/assets/images/programming.png";
import salesImage from "@/assets/images/sales.png";
import writingImage from "@/assets/images/writing.png";
import jobIcon from "@/assets/icons/job.png";
import freelancerIcon from "@/assets/icons/freelancer.png";
import doneIcon from "@/assets/icons/done.png";
import secureIcon from "@/assets/icons/secure.png";

const cardData = [
  {
    title1: "Writing",
    title2: "Translation",
    freelancer: 218356,
    icon: writingImage,
    bgColor: "#EEF8F9",
  },
  {
    title1: "Programming",
    title2: "Software",
    freelancer: 82356,
    icon: programmingImage,
    bgColor: "#FEF8F8",
  },
  {
    title1: "Design",
    title2: "Art",
    freelancer: 1835,
    icon: designImage,
    bgColor: "#EEECF7",
  },
  {
    title1: "Administrative ",
    title2: "Secretarial",
    freelancer: 28356,
    icon: admistrativeImage,
    bgColor: "#FDF6E4",
  },
  {
    title1: "Sales",
    title2: "Marketing",
    freelancer: 2183,
    icon: salesImage,
    bgColor: "#DBD7FB",
  },
  {
    title1: "Engineering ",
    title2: "Architecture",
    freelancer: 8356,
    icon: engineerImage,
    bgColor: "#D3FFDE",
  },
  {
    title1: "Business ",
    title2: "Finance",
    freelancer: 21856,
    icon: businessImage,
    bgColor: "#FFE2C8",
  },
  {
    title1: "Education",
    title2: "Training",
    freelancer: 18356,
    icon: educationImage,
    bgColor: "#D3EFFD",
  },
];

const HomeSection2 = () => {
  return (
    <>
      <div className="mb-10 mt-10 text-3xl">
        <h1 className="text-center">Find Top Freelancer</h1>
        <div className="mx-auto mt-5 w-20 border-b border-gray-600"></div>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:px-24 lg:grid-cols-4">
        {cardData.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`rounded p-5 shadow`}
              style={{ background: item.bgColor }}
            >
              <Image
                src={item.icon}
                alt="write"
              />
              <h3 className="mt-5 text-left text-xl font-semibold">{item.title1} &</h3>
              <h3 className="text-left text-xl font-semibold">{item.title2}</h3>
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <Link href="search-freelancer">
          <span className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
            See All Skills
          </span>
        </Link>
      </div>

      <div className="container mx-auto mb-10 mt-16 px-6 text-center text-3xl">
        <h2>It’s Easy to Get Work Done on Alanced</h2>
        <div className="mx-auto mt-5 w-20 border-b border-gray-600"></div>
      </div>
      <div className="container mx-auto grid grid-cols-1 items-center gap-4 px-6 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col items-center">
          <Image
            src={jobIcon}
            alt="job-icon"
          />
          <h4 className="mt-3 text-center text-xl font-semibold">Post a Job</h4>
          <p className="mt-2 text-center text-xs font-semibold opacity-40">
            Create your free job posting and
            <br />
            start receiving Quotes within
            <br />
            hours.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={freelancerIcon}
            alt="freelancer-icon"
          />
          <h4 className="mt-3 text-center text-xl font-semibold">Hire Freelancers</h4>
          <p className="mt-2 text-center text-xs font-semibold opacity-40">
            Compare the Quotes you receive
            <br />
            and hire the best freelance
            <br />
            professionals for the job.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={doneIcon}
            alt="done-icon"
          />
          <h4 className="mt-3 text-center text-xl font-semibold">Get Work Done</h4>
          <p className="mt-2 text-center text-xs font-semibold opacity-40">
            Decide on how and when <br /> payments will be made and use <br />
            WorkRooms to collaborate,
            <br /> communicate and track work.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={secureIcon}
            alt="secure-icon"
          />
          <h4 className="mt-3 text-center text-xl font-semibold">Make Secure Payments</h4>
          <p className="mt-2 text-center text-xs font-semibold opacity-40">
            Choose from multiple payment <br /> methods with SafePay payment <br /> protection.
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-8 px-6 text-center">
        <Link href="/contact-us">
          <span className="inline-block rounded border bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-sm font-semibold text-white">
            See How Alanced Work
          </span>
        </Link>
      </div>
    </>
  );
};

export default HomeSection2;
