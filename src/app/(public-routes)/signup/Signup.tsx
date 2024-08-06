"use client";
import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import registerimg from "../../components/images/register.png";
// import google from "@/assets/images/google.png";
// import box from "../../components/images/box.png";
import registerimg2 from "@/assets/images/register2.png";
// import { useDispatch, useSelector } from "react-redux";
// import { AddNewFreelancerAction } from "../../redux/Freelancer/FreelancerAction";
import logo from "@/assets/images/alanced.png";
import { toast } from "react-hot-toast";
// import "font-awesome/css/font-awesome.min.css";
// import { Alert, Typography } from "@material-tailwind/react";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { errorLog } from "@/utils/errorLog";
import { axiosIntance } from "@/utils/axiosIntance";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

interface IFreelancer {
  first_Name: string;
  last_Name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [userInfo, setUserInfo] = useState<IFreelancer>({
    first_Name: "",
    last_Name: "",
    email: "",
    password: "",
  });
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const addfree = useSelector((state:any) => state.freelancer.addfree);
  // console.log(addfree);
  // const [show, toogleShow] = useState(false);
  // const [emailval, setemailval] = useState(false);
  // const [allfieldval, setallfieldval] = useState(false);

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
        "Password must contain atleast 8 characters,one numeric digit,one uppercase & lowercase letter and one special character, e.g., ! @ # ?"
      );
      return;
    }

    setIsLoading(true);

    const formData = new URLSearchParams();
    formData.append("first_Name", userInfo.first_Name);
    formData.append("last_Name", userInfo.last_Name);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("password2", userInfo.password);

    try {
      const res = await axiosIntance.post("/account/freelancer/registration", { data: formData });
      toast.success(res.data?.message);
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }

    // dispatch(AddNewFreelancerAction(formData));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handle_password_alert = () => {
    if (typeof userInfo.password !== "undefined") {
      if (validatePassword(userInfo.password) === false) {
        return (
          // <alert
          <span
            className="mb-1 mt-1 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-semibold text-white"
            // animate={{ mount: { y: 0 }, unmount: { y: 100 } }}
          >
            {/* <Typography className="">
              Ensure that these requirements are met:
            </Typography> */}
            <p className="text-left">
              1. Password must contain atleast 8 characters
              <br />
              2. One numeric digit <br />
              3. One uppercase & lowercase letter <br />
              4. One special character, e.g., ! @ # ?
            </p>
          </span>
          // </alert>
        );
      }
    }
  };

  // const handlealert = ()=>{
  //     if (typeof(userInfo.email)!="undefined"){
  //         if(validateEmail(userInfo.email)==false){
  //           return   <Alert className='mb-2 mt-1 bg-gradient-to-r from-[#0909E9] to-[#00D4FF]  text-white font-semibold' animate={{mount:{ y:0 }, unmount:{ y: 100},}}>
  //           <Typography className="">
  //             Please give valid email address
  //           </Typography>
  //         </Alert>
  //         }
  //       }}

  //       let a=false
  //       // const handleDisable_btn= ()=> {
  //       if(typeof(userInfo.first_Name)==='undefined'){
  //           a=true
  //       } else if(typeof(userInfo.last_Name)==='undefined'){
  //           a=true
  //       }else if(typeof(userInfo.email)==='undefined'){
  //           a=true
  //       }else if(validateEmail(userInfo.email)==false){
  //         a=true
  //       }else if(typeof(userInfo.password)==='undefined'){
  //           a=true
  //       }else if(validatePassword(userInfo.password)==false){
  //           a=true
  //       }else if(userInfo.first_Name==""){
  //           a=true
  //       }else if(userInfo.last_Name==""){
  //           a=true
  //       }else if(userInfo.email==""){
  //           a=true
  //       }
  //       else if(userInfo.password==""){
  //           a=true
  //       }

  //       const handleDisable_btn= ()=> {
  //       if (a==true){
  //           return true
  //       }
  //       }

  // const handleallalert = ()=>{
  //     if (a==true){
  //     return  <Alert className='mb-2 mt-2 bg-gradient-to-r from-[#0909E9] to-[#00D4FF]  text-white font-semibold' animate={{mount:{ y:0 }, unmount:{ y: 100},}}>
  //     <Typography className="">
  //     All fields must be required
  //     </Typography>
  //     </Alert>
  //     }}

  // const logins = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //         headers: {
  //           Authorization: `Bearer ${response.access_token}`,
  //         },
  //       });

  //       const payload = {
  //         email: res.data.email,
  //         type: "FREELANCER",
  //       };

  //       const registrationResponse = await axios.post(
  //         "https://www.api.alanced.com/account/google-sign-up/",
  //         payload
  //       );
  //       if (
  //         registrationResponse.data &&
  //         registrationResponse.data.status === 200 &&
  //         registrationResponse.data.message === "Email already exists"
  //       ) {
  //         toast.error("This email already exists");
  //       } else {
  //         router.push("/");
  //         toast.success(payload.type.toLowerCase() + " Registration Successful");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       toast.error("Something went wrong. Please try again.");
  //     }
  //   },
  // });

  return (
    <>
      <div className="flex min-h-screen items-center bg-gray-50">
        <div className="mx-auto h-full max-w-4xl flex-1 bg-white shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="relative h-[535px] md:h-auto md:w-[45%]">
              <Image
                className="h-full w-full object-cover md:h-[580px]"
                src={registerimg2}
                alt="img"
              />
              <Link href="/">
                <div className="absolute left-[18%] top-[19px] flex -translate-x-1/2 transform items-center space-x-2 rounded-bl-none rounded-br rounded-tl-none rounded-tr bg-[#E2F9EE] p-3 sm:left-1/4 md:left-[73.2px] lg:bg-white">
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
            <div className="flex items-center justify-center p-8 pt-4 sm:px-14 md:w-[57%]">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="inline-block text-xs">Already have an account?</p>
                  <Link href="/login">
                    <span className="mb-6 ml-4 inline-block w-24 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] py-[10px] text-center text-sm font-semibold text-white">
                      Sign in
                    </span>
                  </Link>
                </div>

                <h1 className="font-cardo mb-4 mt-10 text-left text-xl text-gray-700">
                  Create Your Free Account
                </h1>
                <div className="flex flex-row space-x-4">
                  <div className="">
                    <label
                      htmlFor="firstname"
                      className="font-cardo block text-left text-sm"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="First Name"
                      name="first_Name"
                      onChange={onChange}
                      required
                      autoComplete={"on"}
                    />
                  </div>
                  <div className="">
                    <label
                      htmlFor="lastname"
                      className="font-cardo block text-left text-sm"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                    className="font-cardo mt-4 block text-left text-sm"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="example@gmail.com"
                    name="email"
                    onChange={onChange}
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
                      id="password"
                      type={inputType}
                      className="mt-1 w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="•••••••••••"
                      name="password"
                      onChange={onChange}
                      required
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                    >
                      {inputType === "password" ? <IoEyeSharp /> : <FaEyeSlash />}
                      {/* <i
                        className={`fa ${inputType === "password" ? "fa-eye-slash" : "fa-eye"} text-blue-600`}
                      ></i> */}
                    </button>
                  </div>
                </div>
                {handle_password_alert()}
                {/* {handlealert()}
                        {handleallalert()} */}
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

                <div className="flex items-center">
                  <div className="my-8 flex-1 border-t-2"></div>
                  <span className="font-jost bg-white px-4">or</span>
                  <div className="my-8 flex-1 border-t-2"></div>
                </div>

                <button
                  className="focus:shadow-outline-blue font-jost flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-semibold leading-5 text-black transition-colors duration-150 focus:outline-none"
                  // onClick={logins}
                >
                  <FcGoogle className="text-xl" />
                  Sign Up with Google
                </button>
                <p className="font-inter pt-3 text-left text-xs">
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
