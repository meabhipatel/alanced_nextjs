import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   GetFreelancerSelfProfileAction,
//   UpdateFreelancerProfileAction,
// } from "../../../redux/Freelancer/FreelancerAction";
import LanguageList from "@/constant/allSelectionData/languageList";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { IoClose } from "react-icons/io5";

interface IEditLanguagePopupProps {
  closeEditLanguage: () => void;
}

const EditLanguagePopup: React.FC<IEditLanguagePopupProps> = ({ closeEditLanguage }) => {
  // const freelancerselfprofile = useSelector((state) => state.freelancer.freelancerselfprofile);
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);
  //   const accessToken = useSelector(state => state.login.accessToken);
  // const accessToken =
  //   useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  // const dispatch = useDispatch();

  const [Language, setLanguage] = useState<string[]>([]);
  // const [currentLanguage, setCurrentLanguage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile && freelancerselfprofile.Language) {
      setLanguage(JSON.parse(freelancerselfprofile.Language.replace(/'/g, '"')));
    }
  }, [freelancerselfprofile]);

  const removeLanguage = (index: number) => {
    setLanguage((prevLanguages) => prevLanguages.filter((_, idx) => idx !== index));
    setError("");
  };

  // const formatLanguagesForDispatch = (LanguageArray: string[]): { [key: string]: string } => {
  //   const formatted: { [key: string]: string } = {};
  //   LanguageArray.forEach((language, index) => {
  //     formatted[`Language[${index}]`] = language;
  //   });
  //   return formatted;
  // };

  const handleSave = () => {
    // const formattedLanguage = formatLanguagesForDispatch(Language);
    // dispatch(UpdateFreelancerProfileAction(formattedLanguage, accessToken));
    closeEditLanguage();
    // dispatch(GetFreelancerSelfProfileAction(accessToken));
  };

  //   const allLanguages = [
  //     'Hindi', 'English', 'Gujarati', 'Marathi', 'French', 'German', 'Spanish', 'Tamil','Punjabi','Arabic','Urdu','Russian','Japanese','Bengali','Turkish','Korean','Italian'
  // ];

  const allLanguages = LanguageList.sort();

  const [searchTermLanguage, setSearchTermLanguage] = useState("");
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const wrapperRefLanguage = useRef<HTMLDivElement | null>(null);

  const filteredLanguages = allLanguages.filter(
    (language) =>
      language.toLowerCase().includes(searchTermLanguage.toLowerCase()) &&
      !Language.includes(language)
  );

  const handleClickOutsideLanguage = (event: MouseEvent) => {
    if (wrapperRefLanguage.current && !wrapperRefLanguage.current.contains(event.target as Node)) {
      setIsOpenLanguage(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideLanguage);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLanguage);
    };
  }, []);

  return (
    <>
      <style>
        {`
    .dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 100%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
        margin-top:11px;
    }
    
    .dropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .dropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
      </style>
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[50%]">
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">
                {Language && Language.length > 0 ? "Edit Language" : "Add Language"}
              </h1>

              <button
                onClick={closeEditLanguage}
                className="text-gray-500 hover:text-gray-700"
              >
                {/* <i className="bi bi-x-lg"></i> */}
                <IoClose className="text-3xl" />
              </button>
            </div>
            <div className="mt-10">
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Language
              </h1>
              <div className="my-3 flex flex-wrap items-center rounded-md border p-2">
                {Array.isArray(Language) &&
                  Language.map((language, index) => (
                    <div
                      key={index}
                      className="my-2 mr-3 flex items-center rounded border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-2 py-1.5 font-semibold text-white"
                    >
                      <span>{language}</span>
                      <button
                        onClick={() => removeLanguage(index)}
                        className="ml-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white pb-0.5 text-sm text-blue-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                <div
                  ref={wrapperRefLanguage}
                  className="relative w-full"
                >
                  <input
                    type="text"
                    value={searchTermLanguage}
                    onClick={() => setIsOpenLanguage(!isOpenLanguage)}
                    onChange={(e) => setSearchTermLanguage(e.target.value)}
                    className="w-full outline-none"
                    placeholder="Search & Select Languages"
                  />
                  {isOpenLanguage && (
                    <ul className="dropdown-list w-full">
                      {filteredLanguages.length > 0 ? (
                        filteredLanguages.map((language, index) => (
                          <li key={index}>
                            <button
                              onClick={() => {
                                if (Language.length < 8) {
                                  setLanguage((prev) => [...prev, language]);
                                  setSearchTermLanguage("");
                                  setIsOpenLanguage(false);
                                } else {
                                  setError("You can add a maximum of 8 Languages.");
                                }
                              }}
                            >
                              {language}
                            </button>
                          </li>
                        ))
                      ) : (
                        <li>No results found</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>
            <div className="mt-8 flex justify-end">
              <Link
                href=""
                onClick={handleSave}
              >
                <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Save
                </span>
              </Link>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeEditLanguage}
              >
                <Link href="">
                  <button className="bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditLanguagePopup;
