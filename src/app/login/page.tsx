"use client";
import React, { ChangeEvent, useState } from "react";
import loginHeroImage from "@/assets/images/loginHero.png";
import logo from "@/assets/images/alanced.png";
// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
// import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleLoginAsync } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { ELoginMethod, EUserType, setUserAuthProfile } from "@/store/features/auth/authSlice";
import { EUserType } from "@/store/features/auth/authSlice";
// import cookies from "js-cookie";

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
  const [rememberMe, setRememberMe] = useState(false); // eslint-disable-line

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
        // toast.success("You are logged in successfully");
        // const userProfile = res.payload.data.login_data;
        const userType = res.payload.data.type;
        // const loginMethod = ELoginMethod.TRADITIONAL;
        // dispatch(
        //   setUserAuthProfile({
        //     userProfile,
        //     userType,
        //     loginMethod,
        //   })
        // );
        // localStorage.setItem("@userType", userType);
        // localStorage.setItem("@userProfile", JSON.stringify(userProfile));
        // localStorage.setItem("@accessToken", res.payload.data.token.access);
        // cookies.set("token", res.payload.data.token.access);
        if (userType === EUserType.FREELANCER) {
          router.push("/freelancer");
        } else {
          router.push("/hirer");
        }
      } else {
        toast.error("Please provide correct credentials.");
      }
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   const expiry = new Date(localStorage.getItem("tokenExpiry"));

  //   if (token && new Date() < expiry) {
  //   } else {
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("tokenExpiry");
  //   }
  // }, []);

  // const checkEmailExists = async (email, type) => {
  //   const response = await axios.post("https://www.api.alanced.com/account/check-email/", {
  //     email,
  //     type,
  //   });
  //   return response.data;
  // };

  //   const handleGoogleLogin = async (response, userType) => {
  // const logins = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       const googleProfile = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //         headers: {
  //           Authorization: `Bearer ${response.access_token}`,
  //         },
  //       });

  //       const emailCheckResponse = await checkEmailExists(googleProfile.data.email);

  //       if (emailCheckResponse.exists) {
  //         const payload = {
  //           email: googleProfile.data.email,
  //           type: emailCheckResponse.type,
  //         };

  //         const loginResponse = await axios.post(
  //           "https://www.api.alanced.com/account/google-login/",
  //           payload
  //         );

  //         if (loginResponse.data.data && loginResponse.data.data.token.access) {
  //           const jwtToken = loginResponse.data.data.token.access;
  //           const logindata = loginResponse.data.data.login_data;
  //           console.log(logindata, "chklogindataafterlogin");

  //           localStorage.setItem("googleUserName", googleProfile.data.name);
  //           localStorage.setItem("isLoggedIn", "true");
  //           localStorage.setItem("loginMethod", "google");
  //           localStorage.setItem("loginType", emailCheckResponse.type);
  //           localStorage.setItem("jwtToken", jwtToken);
  //           localStorage.setItem("logindata", JSON.stringify(logindata));

  //           // Navigate based on user type
  //           if (emailCheckResponse.type === "FREELANCER") {
  //             navigate("/freelancer/profile");
  //           } else if (emailCheckResponse.type === "HIRER") {
  //             navigate("/hirer/profile");
  //           } else {
  //             toast.error("Invalid user type. Please contact support.");
  //           }
  //         } else {
  //           toast.error("Google login failed. Please try again.");
  //         }
  //       } else {
  //         toast.error("You're not a Registered user, Please signup first.");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Something went wrong. Please try again.");
  //     }
  //   },
  // });

  return (
    <>
      <div className="flex min-h-screen w-full items-center bg-gray-50">
        <div className="mx-auto flex h-full w-full bg-white lg:max-w-4xl">
          <div className="relative hidden w-full md:w-[45%] lg:block">
            <Image
              className="image h-full w-full md:h-auto"
              src={loginHeroImage}
              alt="img"
            />
            <Link href="/">
              <div className="absolute left-[18%] top-[29px] flex -translate-x-1/2 transform items-center space-x-2 rounded-bl-none rounded-br rounded-tl-none rounded-tr bg-[#E2F9EE] p-3 sm:left-1/4 md:left-[73.2px] lg:bg-white">
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
          </div>

          <div className="mt-8 flex h-screen w-full items-center justify-center px-4 sm:px-14 md:mt-0 lg:h-auto lg:w-[55%]">
            <div className="w-full">
              <Link
                className="block lg:hidden"
                href="/"
              >
                <div className="mb-6 flex w-full items-center justify-center gap-2">
                  <Image
                    src={logo}
                    alt="Logo"
                    className="h-6 w-6"
                  />
                  <span className="font-poppins ml-2 text-[20px] font-semibold tracking-widest text-[#031136]">
                    ALANCED
                  </span>
                </div>
              </Link>

              <div className="float-end flex items-center">
                <p className="inline-block text-nowrap text-xs">Don&apos;t have an account?</p>
                <Link href="/signup-options">
                  <span className="mb-6 ml-4 inline-block w-24 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] py-[10px] text-center text-sm font-semibold text-white">
                    Sign Up
                  </span>
                </Link>
              </div>

              <h1 className="font-cardo mb-4 mt-10 text-left text-xl text-gray-700">
                Welcome Sign In to <br />
                Learn Encourage Share , Continue.
              </h1>
              <div>
                <label
                  htmlFor="email"
                  className="font-cardo block text-left text-sm"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="example@gmail.com"
                  id="email"
                  onChange={handleChange}
                  name="email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-cardo mt-4 block text-left text-sm"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={inputType}
                    className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="•••••••••••"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    required
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                  >
                    {inputType === "password" ? <IoEyeSharp /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
              <div className="mb-6 mt-4 flex items-center justify-between text-left">
                <label className="font-inter flex items-center">
                  <input
                    className="mr-2 leading-tight accent-blue-600"
                    type="checkbox"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="text-xs">Remember me</span>
                </label>
                <Link href="/reset-password">
                  <span className="font-inter text-xs text-yellow-400">Reset Password</span>
                </Link>
              </div>
              <button
                disabled={isLoading}
                className="focus:shadow-outline-blue mt-4 block w-full rounded-lg border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 focus:outline-none"
                onClick={handleLogin}
              >
                {isLoading ? (
                  <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-transparent border-r-white border-t-white"></div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="flex items-center">
                <div className="my-8 flex-1 border-t-2"></div>
                <span className="font-jost bg-white px-4">or</span>
                <div className="my-8 flex-1 border-t-2"></div>
              </div>

              <button
                className="focus:shadow-outline-blue font-jost flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-semibold leading-5 text-black transition-colors duration-150 focus:outline-none"
                onClick={Login}
              >
                <FcGoogle />
                Sign In with Google
              </button>
              <p className="font-inter pt-2 text-xs">
                Don&apos;t have an account?{" "}
                <Link href="/signup-options">
                  <span className="text-yellow-400">Create an account</span>
                </Link>{" "}
                It takes less than a minute.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
