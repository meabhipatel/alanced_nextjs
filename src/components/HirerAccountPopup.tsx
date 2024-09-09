import { IHirerProfile } from "@/interfaces";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Loader from "./Loader";

interface IProps {
  handleAccountClose: () => void;
  hirerSelfProfile: IHirerProfile;
  fetchHirerProfile: () => void;
}

const HirerAccountPopup: FC<IProps> = ({
  handleAccountClose,
  hirerSelfProfile,
  fetchHirerProfile,
}) => {
  const [first_Name, setfirst_Name] = useState(hirerSelfProfile.first_Name);
  const [last_Name, setlast_Name] = useState(hirerSelfProfile.last_Name);
  const [email, setemail] = useState(hirerSelfProfile.email);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("first_Name", first_Name);
    formData.append("last_Name", last_Name);
    formData.append("email", email);

    const res = await axiosWithAuth.put("/account/hirer/profile/update", formData);
    toast.success(res.data.message);
    fetchHirerProfile();
    handleAccountClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 md:w-[50%]">
            <div className="text-right">
              <button
                onClick={handleAccountClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            <div className="mx-8">
              <h1 className="font-cardo text-left text-[21px] font-normal text-[#031136]">
                Edit Account
              </h1>
              <div className="mb-2 mt-4 flex flex-col items-center">
                <div className="flex w-full gap-5">
                  <div className="flex w-full flex-col">
                    <span className="text-left">First Name</span>
                    <input
                      type="text"
                      name="first_Name"
                      value={first_Name}
                      onChange={(e) => {
                        setfirst_Name(e.target.value);
                      }}
                      className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder=""
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-left">Last Name</span>
                    <input
                      type="text"
                      name="last_Name"
                      value={last_Name}
                      onChange={(e) => {
                        setlast_Name(e.target.value);
                      }}
                      className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <span className="text-left">Email</span>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder=""
                  />
                </div>
                {/* ---> Commented for now . may use in future */}
                {/* <div className="mr-auto mt-3 flex items-center justify-start gap-6 space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="option"
                      value="available"
                      checked={localAvailability === "available"}
                      onChange={() => setLocalAvailability("available")}
                      className="mr-2 cursor-pointer"
                    />
                    Available Now
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="option"
                      value="off"
                      checked={localAvailability === "off"}
                      onChange={() => setLocalAvailability("off")}
                      className="mr-2 cursor-pointer"
                    />
                    Off
                  </label>
                </div> */}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                >
                  <span className="flex w-20 items-center justify-center rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] py-[10px] text-sm font-semibold text-white">
                    {isUpdating ? <Loader /> : "Save"}
                  </span>
                </button>
                <div className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                  <button
                    className="rounded-sm bg-white px-2 py-1"
                    onClick={handleAccountClose}
                  >
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HirerAccountPopup;
