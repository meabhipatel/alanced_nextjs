import React, { FC, useState } from "react";

import { IHirerProfile } from "@/interfaces";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { MdClose } from "react-icons/md";

interface IProps {
  handleDetailsClose: () => void;
  hirerSelfProfile: IHirerProfile;
  fetchHirerProfile: () => void;
}

const HirerCompanyPopup: FC<IProps> = ({
  handleDetailsClose,
  hirerSelfProfile,
  fetchHirerProfile,
}) => {
  const [Company_Name, setCompany_Name] = useState(hirerSelfProfile.Company_Name);
  const [Company_Establish, setCompany_Establish] = useState(
    hirerSelfProfile.Company_Establish ?? ""
  );
  const [social_media, setsocial_media] = useState(hirerSelfProfile.social_media);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("Company_Name", Company_Name);
    formData.append("Company_Establish", formatToDDMMYYYY(Company_Establish));
    formData.append("social_media", social_media);

    const res = await axiosWithAuth.put("/account/hirer/profile/update", formData);
    toast.success(res.data.message);
    fetchHirerProfile();
    handleDetailsClose();
  };

  const formatToDDMMYYYY = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 md:w-[50%]">
            <div className="text-right">
              <button
                onClick={handleDetailsClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            <div className="mx-8">
              <h1 className="font-cardo text-left text-[21px] font-normal text-[#031136]">
                Edit Company Details
              </h1>
              <div className="mb-2 mt-4 flex flex-col items-center">
                <div className="flex w-full gap-5">
                  <div className="flex w-full flex-col">
                    <span className="text-left">Company Name</span>
                    <input
                      type="text"
                      value={Company_Name}
                      className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) => {
                        setCompany_Name(e.target.value);
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="text-left">Establish</span>
                    <input
                      type="date"
                      value={Company_Establish}
                      className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      onChange={(e) => {
                        setCompany_Establish(e.target.value);
                      }}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <span className="text-left">Website</span>
                  <input
                    type="text"
                    value={social_media}
                    className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={(e) => {
                      setsocial_media(e.target.value);
                    }}
                    placeholder=""
                  />
                </div>
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
                    onClick={handleDetailsClose}
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

export default HirerCompanyPopup;
