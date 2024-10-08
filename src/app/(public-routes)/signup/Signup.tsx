"use client";
import React, { useState } from "react";
import registerimg2 from "@/assets/images/register2.png";
import logo from "@/assets/images/alanced.png";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { errorLog } from "@/utils/errorLog";
import { axiosIntance } from "@/utils/axiosIntance";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { redirect, usePathname, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useAppSelector } from "@/store/hooks";

interface IFreelancer {
  first_Name: string;
  last_Name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<IFreelancer>({
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
  });
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, userType } = useAppSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password: string) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password); // eslint-disable-line

    if (password.length < minLength) {
      return false;
    }
    if (!hasUppercase) {
      return false;
    }
    if (!hasLowercase) {
      return false;
    }
    if (!hasNumber) {
      return false;
    }
    if (!hasSpecialChar) {
      return false;
    }

    return true;
  }

  const handleRegisterUser = async () => {
    if (!userInfo.first_Name || !userInfo.last_Name || !userInfo.email || !userInfo.password) {
      toast.error("All fields are required");
      return;
    }
    if (!validateEmail(userInfo.email)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (!validatePassword(userInfo.password)) {
      toast.error(
        "Password must contain atleast 8 characters, numeric digit, uppercase & lowercase letter and special character",
        { duration: 3000 }
      );
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("first_Name", userInfo.first_Name);
    formData.append("last_Name", userInfo.last_Name);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("password2", userInfo.password);

    try {
      if (pathname === "/signup/freelancer") {
        const res = await axiosIntance.post("/account/freelancer/registration", formData);
        toast.success(res.data?.message);
      } else {
        const res = await axiosIntance.post("/account/hirer/registration", formData);
        toast.success(res.data?.message);
      }
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });

        const payload = {
          email: res.data.email,
          first_Name: res.data.given_name,
          last_Name: res.data.family_name,
          type: "FREELANCER",
        };

        if (pathname === "/signup/hirer") {
          payload.type = "HIRER";
        }

        const registrationResponse = await axiosIntance.post("/account/google-sign-up/", payload);

        if (
          registrationResponse.data &&
          registrationResponse.data.status === 200 &&
          registrationResponse.data.message === "Email already exists"
        ) {
          toast.error("This email already exists", { duration: 2000 });
        } else {
          router.push("/login");
          toast.success(payload.type.toLowerCase() + " Registration Successful");
        }
      } catch (error) {
        errorLog(error);
        toast.error("Something went wrong. Please try again.");
      }
    },
    onError: (error) => {
      errorLog(error);
      toast.error("Signup with google failed", { duration: 2000 });
    },
  });

  const handleClickGoogleButton = () => {
    handleGoogleSignup();
  };

  /** ---> If user already Logged in navigating to previous screen. */
  if (isLoggedIn) {
    if (userType === "FREELANCER") {
      return redirect("/freelancer");
    } else {
      return redirect("/hirer");
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center bg-gray-50">
        <div className="mx-auto h-full max-w-4xl flex-1 bg-white shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Visible only on large screens */}
            <div className="relative hidden h-[535px] md:h-auto md:w-[45%] lg:block lg:w-1/2">
              <Image
                className="h-full w-full object-cover"
                src={registerimg2}
                alt="img"
              />
              <Link href="/">
                <div className="absolute left-4 top-4 flex items-center space-x-2 rounded-lg bg-white p-3 shadow-md lg:top-7">
                  <Image
                    src={logo}
                    alt="Logo"
                    className="h-6 w-6"
                  />
                  <span className="font-poppins ml-2 text-sm font-semibold tracking-widest text-[#031136] md:text-base">
                    ALANCED
                  </span>
                </div>
              </Link>
            </div>

            {/* Visible only on smaller screens */}
            <div className="flex-1 p-6 lg:hidden lg:w-1/2">
              <Link
                href="/"
                className="mb-6 flex items-center justify-center"
              >
                <Image
                  src={logo}
                  alt="Logo"
                  className="h-6 w-6"
                />
                <span className="font-poppins ml-2 text-xl font-semibold text-[#031136]">
                  ALANCED
                </span>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-center p-8 pt-4 sm:px-14 md:w-[57%]">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="inline-block text-xs md:text-sm">Already have an account?</p>
                  <Link href="/login">
                    <span className="mb-6 ml-4 inline-block rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-6 py-3 text-center text-sm font-semibold text-white">
                      Sign in
                    </span>
                  </Link>
                </div>

                <h1 className="font-cardo mb-2 mt-2 text-left text-xl text-gray-700 md:text-2xl">
                  Create Your Free Account
                </h1>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <div className="flex-1">
                    <label
                      htmlFor="firstname"
                      className="font-cardo block text-left text-sm md:text-base"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
                      placeholder="First Name"
                      name="first_Name"
                      onChange={onChange}
                      required
                      autoComplete="on"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="lastname"
                      className="font-cardo block text-left text-sm md:text-base"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
                      placeholder="Last Name"
                      name="last_Name"
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-cardo mt-4 block text-left text-sm md:text-base"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
                    placeholder="example@gmail.com"
                    name="email"
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="font-cardo mt-4 block text-left text-sm md:text-base"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={inputType}
                      className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 md:text-base"
                      placeholder="•••••••••••"
                      name="password"
                      onChange={onChange}
                      required
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-lg md:text-xl"
                    >
                      {inputType === "password" ? <FaEyeSlash /> : <IoEyeSharp />}
                    </button>
                  </div>
                </div>

                <button
                  className="focus:shadow-outline-blue mt-4 block w-full rounded-lg border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 focus:outline-none"
                  onClick={handleRegisterUser}
                >
                  {isLoading ? (
                    <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-transparent border-l-white border-t-white"></div>
                  ) : (
                    "Create your account"
                  )}
                </button>

                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t-2"></div>
                  <span className="font-jost bg-white px-4">or</span>
                  <div className="flex-1 border-t-2"></div>
                </div>

                <button
                  className="focus:shadow-outline-blue font-jost flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-semibold leading-5 text-black transition-colors duration-150 focus:outline-none"
                  onClick={handleClickGoogleButton}
                >
                  <FcGoogle className="text-xl md:text-2xl" />
                  Sign Up with Google
                </button>
                <p className="font-inter pt-3 text-left text-xs md:text-sm">
                  Already have an Account?{" "}
                  <Link href="/login">
                    <span className="text-yellow-400">Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
