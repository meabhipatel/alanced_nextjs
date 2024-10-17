import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

// import { Link } from "react-router-dom";
// import {
//   GetFreelancerSelfProfileAction,
//   UpdateFreelancerProfileAction,
// } from "../../../redux/Freelancer/FreelancerAction";

interface IEditRatePopupProps {
  closeHrRate: () => void;
}

const EditHrRatePopup: React.FC<IEditRatePopupProps> = ({ closeHrRate }) => {
  // const accessToken = useSelector(state => state.login.accessToken);
  //   const accessToken =
  //     useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  //   const dispatch = useDispatch();
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);
  const [userInput, setUserInput] = useState<string>("$0.00");
  const [hourlyRate, setHourlyRate] = useState(
    freelancerselfprofile && freelancerselfprofile ? freelancerselfprofile.hourly_rate : 0
  );
  const [serviceFee, setServiceFee] = useState(0);
  const [totalAfterFee, setTotalAfterFee] = useState(0);

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile) {
      const initialRate = freelancerselfprofile?.hourly_rate || 0;
      setHourlyRate(initialRate);
      setUserInput(`$${initialRate.toFixed(2)}`); // updating the userInput with the initial rate
    }
  }, [freelancerselfprofile]);

  useEffect(() => {
    const parsedRate = parseFloat(userInput.replace("$", ""));
    if (!isNaN(parsedRate)) {
      setHourlyRate(parsedRate);
    }
  }, [userInput]);

  useEffect(() => {
    const fee = (10 / 100) * hourlyRate;
    setServiceFee(fee);
    setTotalAfterFee(hourlyRate - fee);
  }, [hourlyRate]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("hourly_rate", hourlyRate.toString());
    const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
    toast.success(res.data.message);
    // dispatch(UpdateFreelancerProfileAction({ hourly_rate: hourlyRate }, accessToken));
    closeHrRate();
    // dispatch(GetFreelancerSelfProfileAction(accessToken));
  };

  // const accessToken = useSelector(state => state.login.accessToken);

  // const [hourlyrate, setHourlyrate] = useState("");
  // const dispatch = useDispatch();
  // const freelancerselfprofile = useSelector(state => state.freelancer.freelancerselfprofile)
  // useEffect(() => {
  //     if (freelancerselfprofile && freelancerselfprofile[0]) {
  //         setHourlyRate(freelancerselfprofile[0].hourly_rate);
  //     }
  // }, [freelancerselfprofile]);

  // const handleSave = () => {
  //     dispatch(UpdateFreelancerProfileAction({ hourlyRate },accessToken));
  //     closeHrRate();
  // }

  // const [userInput, setUserInput] = useState('');
  // const [hourlyRate, setHourlyRate] = useState(freelancerselfprofile[0].hourly_rate);
  // const [serviceFee, setServiceFee] = useState(0);
  // const [totalAfterFee, setTotalAfterFee] = useState(0);

  // useEffect(() => {
  //   const parsedRate = parseFloat(userInput.replace("$", ""));
  //   if (!isNaN(parsedRate)) {
  //     setHourlyRate(parsedRate);
  //   }
  // }, [userInput]);

  // useEffect(() => {
  //   const fee = (10 / 100) * hourlyRate;
  //   setServiceFee(fee);
  //   setTotalAfterFee(hourlyRate - fee);
  // }, [hourlyRate]);

  return (
    <div className="fixed inset-0 z-10 mt-12 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[50%]">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-[26px] font-normal text-[#031136]">
              Change Hourly Rate
            </h1>
            <button
              onClick={closeHrRate}
              className="text-gray-500 hover:text-gray-700"
            >
              {/* <i className="bi bi-x-lg"></i> */}
              <IoClose className="text-3xl" />
            </button>
          </div>
          <div className="mt-8">
            <p className="font-cardo text-left text-[18px] font-normal text-[#031136]">
              Please note that your new hourly rate will only apply to new contracts.
            </p>
            <p className="font-cardo text-left text-[18px] font-normal text-[#031136] opacity-50">
              Your profile Rate: $
              {freelancerselfprofile && freelancerselfprofile
                ? freelancerselfprofile.hourly_rate
                : 0}
              /hr
            </p>
            <div>
              <div className="mt-4 flex items-center">
                <div className="flex w-2/3 flex-col justify-center">
                  <h1 className="font-cardo text-left text-[18px] font-normal text-[#031136]">
                    Hourly Rate
                  </h1>
                  <p className="font-cardo text-left text-[14px] font-normal text-[#031136] opacity-50">
                    Total amount the client will see
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-56 rounded-md border px-2 py-1.5 text-right focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={userInput}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, "");
                      if (value === "") {
                        setUserInput("$");
                      } else {
                        setUserInput("$" + value);
                      }
                    }}
                    placeholder="$0.00"
                  />
                  <span>/Hr</span>
                </div>
              </div>

              <div className="my-5 border-b opacity-60"></div>

              <div className="mt-4 flex items-center">
                <div className="flex w-2/3 flex-col justify-center">
                  <h1 className="font-cardo text-left text-[18px] font-normal text-[#031136]">
                    10% Service Fee
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-56 rounded-md border-none bg-blue-50 px-2 py-1.5 text-right"
                    value={`-$${serviceFee.toFixed(2)}`}
                    disabled
                  />
                  <span>/Hr</span>
                </div>
              </div>

              <div className="my-5 border-b opacity-60"></div>

              <div className="mt-4 flex items-center">
                <div className="flex w-2/3 flex-col justify-center">
                  <h1 className="font-cardo text-left text-[18px] font-normal text-[#031136]">
                    You&#39;ll Receive
                  </h1>
                  <p className="font-cardo text-left text-[14px] font-normal text-[#031136] opacity-50">
                    The estimated amount you&#39;ll receive after service fees
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-56 rounded-md border px-2 py-1.5 text-right focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={`$${totalAfterFee.toFixed(2)}`}
                    disabled
                  />
                  <span>/Hr</span>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                // to=""
                onClick={handleSave}
              >
                <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Save
                </span>
              </button>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeHrRate}
              >
                {/* <Link to=""> */}
                <button className="bg-white px-2 py-1">
                  <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                    Cancel
                  </p>
                </button>
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHrRatePopup;
