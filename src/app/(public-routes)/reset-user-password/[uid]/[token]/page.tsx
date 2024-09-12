"use client";
import React, { FC, useState } from "react";
import logo from "@/assets/images/alanced.png";
import chooseoption from "@/assets/images/chooseoption.png";
// import { Link, useNavigate, useParams } from "react-router-dom";
import Link from "next/link";
// import { useRouter } from "next/router";
import Image from "next/image";

// import { useDispatch, useSelector } from "react-redux";
// import { ResetPasswordAction } from "../../redux/User/UserAction";
import toast from "react-hot-toast";
import { errorLog } from "@/utils/errorLog";
import axios, { AxiosError } from "axios";
// import { errorLog } from "@/utils/errorLog";

interface IProps {
  params: { uid: string; token: string };
}

const ResetPassword: FC<IProps> = ({ params: { uid, token } }) => {
  // const router = useRouter();
  //   const { uid, token } = useParams();
  // const { uid, token } = router.query;
  // errorLog(uid);
  // errorLog(token);
  // console.log(uid, token);

  const initialUserState = {
    password: "",
    password2: "",
  };

  const [resetuserpass, setResetUserPass] = useState(initialUserState);
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const resetpass = useSelector((state) => state.user.resetpass);
  //   const [show, toogleShow] = useState(false);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  //   useEffect(() => {
  //     if (resetpass) {
  //       setResetUserPass(initialUserState);
  //     }
  //   }, [resetpass]);

  //   const Loader = () =>{
  //     if(resetpass==false || resetpass == true){
  //         toogleShow(false)
  //         navigate('/login')
  //     }
  //     return(
  //         <>
  //         <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
  //         </>
  //     )
  // }

  const ResetUserPassword = async () => {
    if (!resetuserpass.password || !resetuserpass.password2) {
      toast.error("Both Fields are Required");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("password", resetuserpass.password);
    formData.append("password2", resetuserpass.password2);

    // dispatch(ResetPasswordAction(uid, token, formData));
    try {
      // Make API request to reset the password
      const response = await axios.post(
        `http://localhost:8000/account/password/reset/${uid}/${token}/`,
        formData
      );

      // Handle success response
      toast.success("Password has been reset successfully!");
      errorLog(response.data);
    } catch (error) {
      // Handle error response
      toast.error("Failed to reset password");
      if (error instanceof AxiosError) {
        errorLog(error.response?.data || error.message);
      }
    }
    // toogleShow(true)
  };

  const onChange = (e: { target: { name: string; value: string } }) => {
    setResetUserPass({
      ...resetuserpass,
      [e.target.name]: e.target.value,
    });
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
      <div className="h-[460px] w-[350px] max-w-2xl border border-blue-300 bg-white p-10 pt-7 shadow-lg lg:h-[340px] lg:w-[550px]">
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
            type={showPassword1 ? "text" : "password"}
            className="mb-5 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="•••••••••••"
            name="password"
            onChange={onChange}
            value={resetuserpass.password}
          />
          <button
            onClick={togglePasswordVisibility1}
            className="absolute inset-y-0 right-0 mb-2.5 flex cursor-pointer items-center pr-3"
          >
            <i className={`fa ${showPassword1 ? "fa-eye" : "fa-eye-slash"} text-blue-600`}></i>
          </button>
        </div>
        {/* <input type="password" className='border mt-2 mb-5 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='•••••••••••' name='password' onChange={onChange} value={resetuserpass.password}/> */}
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
            type={showPassword2 ? "text" : "password"}
            className="mb-5 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="•••••••••••"
            name="password2"
            onChange={onChange}
            value={resetuserpass.password2}
          />
          <button
            onClick={togglePasswordVisibility2}
            className="absolute inset-y-0 right-0 mb-1 flex cursor-pointer items-center pr-3"
          >
            <i className={`fa ${showPassword2 ? "fa-eye" : "fa-eye-slash"} text-blue-600`}></i>
          </button>
        </div>
        {/* <input type="password" className='border mt-2 mb-5 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='•••••••••••' name='password2' onChange={onChange} value={resetuserpass.password2}/> */}
        <button
          onClick={ResetUserPassword}
          className="focus:shadow-outline-blue mt-2 block w-full rounded-md border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 focus:outline-none"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
