"use client";
import React, { FC, useState } from "react";
import logo from "@/assets/images/alanced.png";
import chooseoption from "@/assets/images/chooseoption.png";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { errorLog } from "@/utils/errorLog";
import { AxiosError } from "axios";
import { axiosIntance } from "@/utils/axiosIntance";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

interface IProps {
  params: { uid: string; token: string };
}

const ResetPassword: FC<IProps> = ({ params: { uid, token } }) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Both Fields are Required");
      return;
    } else if (newPassword !== confirmPassword) {
      return toast.error("Password must match.");
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("password", newPassword);
    formData.append("password2", confirmPassword);
    try {
      await axiosIntance.post(`/account/password/reset/${uid}/${token}`, formData);
      toast.success("Password has been reset successfully!");
      router.replace("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        errorLog(error.response?.data || error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${chooseoption.src})`,
        backgroundSize: "850px 550px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link
        href="/"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div className="absolute left-1/2 top-[50px] flex -translate-x-1/2 transform items-center space-x-2 bg-[#E2F9EE] p-3 sm:left-1/4 md:left-[331.2px] lg:rounded-bl-none lg:rounded-br lg:rounded-tl-none lg:rounded-tr lg:bg-white">
          <Image
            src={logo}
            alt="Logo"
            className="h-5 w-5 md:h-6 md:w-6"
          />
          <span className="font-poppins ml-2 text-[15px] font-semibold tracking-widest text-[#031136] md:text-[16px]">
            ALANCED
          </span>
        </div>
      </Link>
      <div className="w-[350px] max-w-2xl border border-blue-300 bg-white p-10 pt-7 shadow-lg lg:w-[550px]">
        <h3 className="font-cardo mb-8 text-center text-xl">Reset Your Password</h3>
        <div className="text-left">
          <label
            htmlFor="new-password"
            className="font-cardo text-sm"
          >
            New Password <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <input
            id="new-password"
            name="new-password"
            type={showPassword ? "text" : "password"}
            className="mb-5 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="•••••••••••"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="confirm-password"
            className="font-cardo text-sm"
          >
            Confirm New Password <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="relative">
          <input
            id="confirm-password"
            name="confirm-password"
            type={showPassword ? "text" : "password"}
            className="mb-4 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="•••••••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="show-password"
            id="show-password"
            onChange={(e) => setShowPassword(e.target.checked)}
            checked={showPassword}
          />
          <label
            htmlFor="show-password"
            className="select-none text-xs"
          >
            Show Password
          </label>
        </div>

        <button
          onClick={handleResetPassword}
          className="focus:shadow-outline-blue mt-4 block w-full rounded-md border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 focus:outline-none"
        >
          {isLoading ? <Loader /> : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
