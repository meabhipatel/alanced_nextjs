import happyclient from "@/assets/images/happyclient.png";
import client1 from "@/assets/images/client1.png";
import client2 from "@/assets/images/client2.png";
import Image from "next/image";
import { LuCheckCircle } from "react-icons/lu";

const HomeSection1 = () => {
  return (
    <div>
      <hr className="mx-28 my-9" />
      <div className="flex flex-col gap-4 px-4 md:mt-6 md:flex-row lg:px-32">
        <div className="relative w-full p-10 md:w-[50%]">
          <div className="hidden h-[210px] w-[190px] rounded shadow-lg md:absolute md:left-0 md:top-0 md:block md:h-[210px] md:w-[190px]">
            <Image
              src={client2}
              alt="client"
            />
          </div>
          <div className="mt-4 h-auto w-full rounded shadow-lg md:absolute md:left-[170px] md:top-[65px] md:h-[295px] md:w-[220px]">
            <Image
              src={client1}
              alt="client"
              className="h-auto w-full md:h-[295px] md:w-[222px]"
            />
          </div>
          <div className="z-20 mt-4 h-[83px] w-[170px] rounded bg-white p-6 shadow-lg md:absolute md:left-[30px] md:top-[276.5px]">
            <Image
              src={happyclient}
              alt=""
            />
          </div>
        </div>
        <div className="w-full p-4 text-left md:w-[50%]">
          <h4 className="mt-5 text-lg text-[#0A142F] md:text-[23px]">
            Simple Solutions for Complex <br />
            Connections
          </h4>
          <p className="mt-3 text-sm opacity-50 md:text-[13px]">
            Welcome to our freelancing platform, your gateway to success in the digital realm! Our
            platform offers a straightforward approach to navigating the intricate web of
            professional connections, providing freelancers with a reliable and user-friendly
            interface. Embrace the essence of simplicity as you curate your portfolio and showcase
            your diverse skills and expertise. From graphic designing to web development, each
            project resonates with clarity and purpose, leaving a lasting impression on potential
            clients. Join us in navigating the dynamic landscape of freelancing with confidence and
            ease. Your portfolio is more than just a collection of works—it&apos;s a compelling
            narrative of your professional journey and achievements.
          </p>
          <div className="mt-4 flex flex-wrap items-center space-x-3">
            <LuCheckCircle />
            <span className="pr-6 text-[15px]">High Analysis</span>
            <LuCheckCircle />
            <span className="text-[15px]">Certified Institute</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection1;
