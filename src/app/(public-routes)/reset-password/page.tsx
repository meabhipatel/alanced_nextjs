import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bgimage from "@/assets/images/reset_password.png";
import logo from "@/assets/images/alanced.png";

function ResetPasswordPage() {
  return (
    <div
      className="relative flex h-screen bg-cover bg-center px-5"
      style={{ backgroundImage: `url(${bgimage.src})` }}
    >
      <Link href={"/"}>
        <div className="absolute top-7 left-7 md:top-9 md:left-9 flex items-center">
          <Image src={logo} alt="logo" width={50} height={50} />
          <span className="font-poppins ml-2 text-[20px] md:text-[23px] font-semibold tracking-widest text-[#031136]">
            ALANCED
          </span>
        </div>
      </Link>
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-white border border-blue-300 p-6 md:p-8 w-full max-w-md md:max-w-xl mx-auto shadow-lg">
          <h2 className="text-xl md:text-2xl mb-4 text-center">Reset Password</h2>
          <div className="relative mb-6 mt-1 w-[150px] md:w-[200px] mx-auto">
            <div className="absolute text-center inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
            <div className="rounded-lg border-b-2 border-gray-600"></div>
          </div>
          <p className="text-gray-700 mb-6 text-start">Enter your email address and we will send you a link to reset your password.</p>
          <div className="flex items-center border border-gray-300 rounded-lg p-2 shadow-sm w-full mb-6">
            <input
              type="text"
              placeholder="Email Address"
              className="w-full pl-4 py-2 border-none focus:outline-none"
            />
          </div>
          <button className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF] hover:from-[#00D4FF] hover:to-[#0909E9] transition-colors">
            Send Password Reset Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
