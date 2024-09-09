import React, { FC, useState } from "react";
import { IHirerProfile } from "@/interfaces";
import toast from "react-hot-toast";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import cityList from "@/constant/allSelectionData/cityList";
import { MdClose } from "react-icons/md";
import Loader from "./Loader";

interface IProps {
  handleContactsClose: () => void;
  hirerSelfProfile: IHirerProfile;
  fetchHirerProfile: () => void;
}

const HirerContactPopup: FC<IProps> = ({
  handleContactsClose,
  hirerSelfProfile,
  fetchHirerProfile,
}) => {
  const [contact, setcontact] = useState(hirerSelfProfile.contact);
  const [Address, setAddress] = useState(hirerSelfProfile.Address);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleContactInputChange = (value: string) => {
    if (isNaN(Number(value))) return;
    if (value.length > 10) return;
    setcontact(value);
  };

  const handleSave = async () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("contact", contact);
    formData.append("Address", Address);

    const res = await axiosWithAuth.put("/account/hirer/profile/update", formData);
    toast.success(res.data.message);
    fetchHirerProfile();
    handleContactsClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-4 md:w-[36%]">
            <div className="text-right">
              <button
                onClick={handleContactsClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose className="text-xl" />
              </button>
            </div>
            <div className="mx-8">
              <h1 className="font-cardo text-left text-[21px] font-normal text-[#031136]">
                Edit Company Contacts
              </h1>
              <div className="mb-2 mt-4 flex flex-col items-center">
                <div className="flex w-full gap-5">
                  <div className="flex w-full flex-col">
                    <span className="text-left">Phone</span>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => handleContactInputChange(e.target.value)}
                      className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="Contact Number"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <span className="text-left">Address</span>
                  <select
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mb-6 mt-2 w-full rounded-md border bg-white px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option
                      disabled
                      selected
                      value=""
                    >
                      City
                    </option>
                    {cityList.map((location) => (
                      <option
                        key={location}
                        value={location}
                      >
                        {location}
                      </option>
                    ))}
                  </select>
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
                    onClick={handleContactsClose}
                    disabled={isUpdating}
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

export default HirerContactPopup;
