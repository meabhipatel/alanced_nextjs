import React, { useEffect, useRef, useState } from "react";
import CityList from "@/constant/allSelectionData/cityList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IoClose } from "react-icons/io5";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { handleGetUpdatedProfileAsync } from "@/store/features/auth/authApi";

interface IAvailableOffPopupProps {
  isAvailable: string;
  setIsAvailable: (value: string) => void;
  closeAvailableOff: () => void;
}

const AvailableOffPopup: React.FC<IAvailableOffPopupProps> = ({
  isAvailable,
  setIsAvailable,
  closeAvailableOff,
}) => {
  const dispatch = useAppDispatch();
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);
  const [localAvailability, setLocalAvailability] = useState(isAvailable);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile) {
      setFirstName(freelancerselfprofile.first_Name);
      setLastName(freelancerselfprofile.last_Name);
      setAddress(freelancerselfprofile.Address);
    }
  }, [freelancerselfprofile]);

  const handleSave = async () => {
    setIsAvailable(localAvailability);
    const formData = new FormData();
    formData.append("first_Name", firstName);
    formData.append("last_Name", lastName);
    formData.append("Address", address);
    formData.append("availableStatus", localAvailability);

    const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
    dispatch(handleGetUpdatedProfileAsync());
    toast.success(res.data.message);
    closeAvailableOff();
  };

  const [cities] = useState(CityList.sort());

  const [searchTermAddress, setSearchTermAddress] = useState(address || "");
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const wrapperRefAddress = useRef<HTMLDivElement | null>(null);

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTermAddress.toLowerCase())
  );

  const handleClickOutsideAddress = (event: MouseEvent) => {
    if (wrapperRefAddress.current && !wrapperRefAddress.current.contains(event.target as Node)) {
      setIsOpenAddress(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideAddress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAddress);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[37%]">
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">Edit Profile</h1>
              <button
                onClick={closeAvailableOff}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose className="text-3xl" />
              </button>
            </div>
            <div className="mt-10">
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                First Name
              </h1>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="John"
              />

              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Last Name
              </h1>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Doe"
              />

              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Location
              </h1>

              <div
                ref={wrapperRefAddress}
                className="relative"
              >
                <input
                  type="text"
                  value={address}
                  onClick={() => setIsOpenAddress(!isOpenAddress)}
                  onChange={(e) => {
                    setSearchTermAddress(e.target.value);
                    setAddress(e.target.value);
                    setIsOpenAddress(true);
                  }}
                  className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Select City"
                />
                {isOpenAddress && (
                  <ul className="absolute z-50 max-h-[200px] w-full list-none overflow-y-auto border border-[#ccc] bg-white p-0">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city, index) => (
                        <li key={index}>
                          <button
                            className="h-full w-full px-4 py-1 text-start hover:bg-[#f7f7f7]"
                            onClick={() => {
                              setSearchTermAddress(city);
                              setAddress(city);
                              setIsOpenAddress(false);
                            }}
                          >
                            {city}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>No results found</li>
                    )}
                  </ul>
                )}
              </div>

              <div className="mt-3 flex items-center justify-start gap-6 space-x-4">
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
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white"
                  onClick={handleSave}
                >
                  Save
                </button>

                <button
                  className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                  onClick={closeAvailableOff}
                >
                  <button className="rounded-[3px] bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableOffPopup;
