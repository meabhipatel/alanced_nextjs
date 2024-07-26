"use client";
import Link from "next/link";
import Image from "next/image";
import { useState , ChangeEvent } from "react";

import logoTransparent from "@/assets/images/alanced_transparent.png";
import { FaArrowRightLong, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

// import { useDispatch, useSelector } from "react-redux";
// import { AddUserSubscriptionAction } from "../../redux/User/UserAction";
// import { toast } from "react-toastify";

const Footer = () => {
  const initialUserState = {
    email: "",
  };

  const [addUserSub, setAddUserSub] = useState(initialUserState);
  // const dispatch = useDispatch();

  // const addsub = useSelector((state) => state.user.addsub);

  // useEffect(() => {
  //   if (addsub) {
  //     setAddUserSub(initialUserState);
  //   }
  // }, [addsub]);

  const AddUserSubscribe = () => {
    if (!addUserSub.email) {
      // toast.error("Email is Required");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("email", addUserSub.email);

    // dispatch(AddUserSubscriptionAction(formData));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddUserSub({
      ...addUserSub,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer className="footer-1 bg-whit py-8 sm:py-12">
      <div className="w-full px-5 lg:px-10">
        {/* ---> footer navigations  */}
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
          <div className="p-1 text-left md:p-4">
            <h5 className="mb-6 text-xl font-bold">Company Info</h5>
            <ul className="footer-links list-none text-gray-500">
              <Link href="/about-us">
                <li className="mb-2 hover:text-blue-600 hover:underline">About us</li>
              </Link>
              <Link href="/contact-us">
                <li className="mb-2 hover:text-blue-600 hover:underline">Contact us</li>
              </Link>
              <Link href="/safety-security">
                <li className="mb-2 hover:text-blue-600 hover:underline">Safety & Security</li>
              </Link>
            </ul>
          </div>
          <div className="p-1 text-left md:p-4">
            <h5 className="mb-6 text-xl font-bold">About</h5>
            <ul className="footer-links list-none text-gray-500">
              <Link href="/enterprises">
                <li className="mb-2 hover:text-blue-600 hover:underline">Enterprise </li>
              </Link>
              <Link href="/faq">
                <li className="mb-2 hover:text-blue-600 hover:underline">FAQ</li>
              </Link>
              <Link href="/why-alanced">
                <li className="mb-2 hover:text-blue-600 hover:underline">Alanced Foundation</li>
              </Link>
            </ul>
          </div>
          <div className="p-1 text-left md:p-4">
            <h5 className="mb-6 text-xl font-bold">Policies</h5>
            <ul className="footer-links list-none text-gray-500">
              <Link href="/terms">
                <li className="mb-2 hover:text-blue-600 hover:underline">Terms</li>
              </Link>
              <Link href="/privacy-policy">
                <li className="mb-2 hover:text-blue-600 hover:underline">Privacy</li>
              </Link>
              <Link href="/cookies">
                <li className="mb-2 hover:text-blue-600 hover:underline">Cookies</li>
              </Link>
            </ul>
          </div>
          <div className="col-span-2 p-1 md:p-4">
            <div className="-mt-6 w-full bg-[#F4F5F9] p-2">
              <h5 className="ml-[23px] pt-[22px] text-start text-xl font-bold">Subscribe</h5>
              <div className="mt-5 flex w-full items-center px-2">
                <input
                  type="email"
                  className="h-10 w-full p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Email Address"
                  name="email"
                  onChange={onChange}
                  value={addUserSub.email}
                />
                <button
                  className="inline-block h-10 w-12 rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[12px] text-sm font-semibold text-white lg:mt-0"
                  onClick={AddUserSubscribe}
                >
                  <FaArrowRightLong />
                </button>
              </div>

              <p className="pl-6 pt-3 text-left text-[14px] opacity-50">
                Hello, we are Lift Media. Our goal is to translate <br />
                the positive effects from revolutionizing how <br /> companies engage with their
                clients & their <br /> team.
              </p>
            </div>
          </div>
        </div>

        <hr className="mx-4 my-6 sm:mx-5" />
        {/* ---> footer copyrights text  */}
        <div className="mt-5 flex flex-col items-center space-y-4 px-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex flex-1 justify-start p-4 pl-0 pt-1">
            <Link href="/">
              <div className="flex flex-shrink-0 items-center md:w-1/6">
                <Image
                  src={logoTransparent}
                  alt=""
                />
                <span className="ml-2 text-[23px] font-semibold tracking-widest text-[#031136]">
                  ALANCED
                </span>
              </div>
            </Link>
          </div>
          <div className="flex flex-1 justify-center p-4 pt-1">
            <p className="text-sm font-bold">
              Copyrights © 2024 Alanced <br /> Proudly Created by
              <Link
                href="https://wiz91.com/"
                target="_blank"
                className="text-orange-600 hover:underline"
              >
                {" "}
                Wiz91 Technologies
              </Link>
            </p>
          </div>
          <div className="flex flex-1 justify-end p-4 pr-0 pt-1">
            <div className="flex sm:justify-center md:justify-end xl:justify-start">
              <Link
                href="https://in.linkedin.com/company/wiz91-technologies"
                target="blank(_blank)"
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400 from-[#0909E9] to-[#00D4FF] py-1 text-center text-gray-600 duration-1000 hover:border-[#6f7cf3] hover:bg-gradient-to-r hover:text-white"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                href="https://www.facebook.com/"
                target="blank(_blank)"
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400 from-[#0909E9] to-[#00D4FF] py-1 text-center text-gray-600 duration-300 hover:border-[#6f7cf3] hover:bg-gradient-to-r hover:text-white"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="https://twitter.com/"
                target="blank(_blank)"
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400 from-[#0909E9] to-[#00D4FF] py-1 text-center text-gray-600 duration-1000 hover:border-[#6f7cf3] hover:bg-gradient-to-r hover:text-white"
              >
                <BsTwitterX />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
