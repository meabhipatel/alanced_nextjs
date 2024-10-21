"use client";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState, ChangeEvent } from "react";
import { toast } from "react-hot-toast";

const FooterSubscribeBox = () => {
  const initialUserState = {
    email: "",
  };

  const [addUserSub, setAddUserSub] = useState(initialUserState);

  const AddUserSubscribe = () => {
    if (!addUserSub.email) {
      toast.error("Email is Required");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("email", addUserSub.email);

    // Show success toast
    toast.success("Subscribed successfully!");

    // Reset state after submission
    setAddUserSub(initialUserState);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddUserSub({
      ...addUserSub,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="col-span-2 py-1 md:py-4">
      <div className="-mt-6 w-full bg-[#F4F5F9] p-2">
        <h5 className="ml-[23px] pt-[22px] text-start text-xl font-bold">Subscribe</h5>
        <div className="mt-5 flex w-full items-center px-5 sm:px-3">
          <input
            type="email"
            className="h-10 w-80 p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            value={addUserSub.email}
          />
          <button
            className="inline-block h-10 w-9 rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-3 py-[12px] text-sm font-semibold text-white lg:mt-0"
            onClick={AddUserSubscribe}
          >
            <FaArrowRightLong />
          </button>
        </div>

        <p className="max-w-xs pl-6 pt-3 text-justify text-[14px] leading-tight opacity-60 sm:max-w-sm md:max-w-md lg:max-w-lg">
          Subscribe to an Alanced freelance job portal, designed to support and empower both
          businesses and freelancers alike.
        </p>
      </div>
    </div>
  );
};

export default FooterSubscribeBox;
