import React from "react";
import Link from "next/link";
import Image from "next/image";
import bgimage from "@/assets/images/reset_password.png";
import logo from "@/assets/images/alanced.png";

function ResetPasswordPage() {
  return (
    <div
      className="relative flex h-screen bg-cover bg-center px-5"
      style={{ backgroundImage: `url(${bgimage.src})` }}
    >
      <Link href={"/"}>
        <div className="absolute left-7 top-7 flex items-center md:left-9 md:top-9">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
          />
          <span className="font-poppins ml-2 text-[20px] font-semibold tracking-widest text-[#031136] md:text-[23px]">
            ALANCED
          </span>
        </div>
      </Link>
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto w-full max-w-md border border-blue-300 bg-white p-6 shadow-lg md:max-w-xl md:p-8">
          <h2 className="mb-4 text-center text-xl md:text-2xl">Forget Password</h2>
          <div className="relative mx-auto mb-6 mt-1 w-[150px] md:w-[200px]">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-center"></div>
            <div className="rounded-lg border-b-2 border-gray-600"></div>
          </div>
          <p className="mb-6 text-start text-gray-700">
            Enter your email address and we will send you a link to reset your password.
          </p>
          <div className="mb-6 flex w-full items-center rounded-lg border border-gray-300 p-2 shadow-sm">
            <input
              type="text"
              placeholder="Email Address"
              className="w-full border-none py-2 pl-4 focus:outline-none"
            />
          </div>
          <button className="w-full rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF] py-2 text-white transition-colors hover:from-[#00D4FF] hover:to-[#0909E9]">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
