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

    // Simulate an API call
    console.log("Form Data Submitted: ", formData.toString());//eslint-disable-line

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
    <div className="col-span-2 p-1 md:p-4">
      <div className="-mt-6 w-full bg-[#F4F5F9] p-2">
        <h5 className="ml-[23px] pt-[22px] text-start text-xl font-bold">
          Subscribe
        </h5>
        <div className="mt-5 flex w-full items-center px-5">
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

        <p className="pl-6 pt-3 text-[14px] opacity-60 text-wrap text-justify">
        Subscribe to a Alanced freelance job portal,<br/> designed to support and empower both<br/> businesses and freelancers alike. 
        </p>
      </div>
    </div>
  );
};

export default FooterSubscribeBox;
