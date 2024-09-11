"use client";
import React, { ChangeEvent, useState } from "react";
import loginHeroImage from "@/assets/images/loginHero.png";
import logo from "@/assets/images/alanced.png";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleLoginAsync } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EUserType } from "@/store/features/auth/authSlice";

interface IAuthDetails {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isloading);
  const [authDetails, setAuthDetails] = useState<IAuthDetails>({ email: "", password: "" });
  const [inputType, setInputType] = useState("password");
  const [rememberMe, setRememberMe] = useState(false); //eslint-disable-line

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthDetails({ ...authDetails, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!authDetails.email || !authDetails.password) {
      toast.error("Email and password Both fields are required");
    } else {
      localStorage.setItem("@loginMethod", "TRADITIONAL");
      const res = await dispatch(handleLoginAsync(authDetails));

      if (res.meta.requestStatus === "fulfilled") {
        const userType = res.payload.data.type;
        if (userType === EUserType.FREELANCER) {
          router.push("/freelancer");
        } else {
          router.push("/hirer");
        }
      } else {
        toast.error(res.payload.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center bg-gray-50 px-4 lg:px-0">
      <div className="mx-auto flex w-full flex-col rounded-lg bg-white shadow-lg lg:max-w-4xl lg:flex-row">
        <div className="relative hidden lg:block lg:w-1/2">
          <Image
            className="h-full w-full object-cover"
            src={loginHeroImage}
            alt="Login Hero Image"
          />
          <Link href="/">
            <div className="absolute left-4 top-4 flex items-center space-x-2 rounded-lg bg-white p-3 shadow-md">
              <Image
                src={logo}
                alt="Logo"
                className="h-6 w-6"
              />
              <span className="font-poppins text-lg font-semibold text-[#031136]">ALANCED</span>
            </div>
          </Link>
        </div>

        <div className="flex-1 p-6 lg:w-1/2">
          <Link
            href="/"
            className="mb-6 flex items-center justify-center lg:hidden"
          >
            <Image
              src={logo}
              alt="Logo"
              className="h-6 w-6"
            />
            <span className="font-poppins ml-2 text-xl font-semibold text-[#031136]">ALANCED</span>
          </Link>

          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm">Don&apos;t have an account?</p>
            <Link href="/signup-options">
              <span className="rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-sm font-semibold text-white">
                Sign Up
              </span>
            </Link>
          </div>

          <h1 className="font-cardo mb-6 text-2xl text-gray-700">
            Welcome Sign In to <br />
            Learn Encourage Share, Continue.
          </h1>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="font-cardo block text-sm"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-600"
              placeholder="example@gmail.com"
              id="email"
              onChange={handleChange}
              name="email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="font-cardo block text-sm"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={inputType}
                className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-600"
                placeholder="•••••••••••"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {inputType === "password" ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                className="mr-2 leading-tight accent-blue-600"
                type="checkbox"
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link href="/reset-password">
              <span className="text-xs text-yellow-400">Forget Password</span>
            </Link>
          </div>

          <button
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 focus:outline-none"
            onClick={handleLogin}
          >
            {isLoading ? (
              <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-transparent border-r-white border-t-white"></div>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="my-8 flex items-center">
            <div className="flex-1 border-t-2"></div>
            <span className="bg-white px-4 text-sm">or</span>
            <div className="flex-1 border-t-2"></div>
          </div>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold transition-colors duration-150"
            onClick={() => {}}
          >
            <FcGoogle className="text-xl" />
            Sign In with Google
          </button>

          <p className="pt-2 text-xs">
            Don&apos;t have an account?{" "}
            <Link href="/signup-options">
              <span className="text-yellow-400">Create an account</span>
            </Link>{" "}
            It takes less than a minute.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
