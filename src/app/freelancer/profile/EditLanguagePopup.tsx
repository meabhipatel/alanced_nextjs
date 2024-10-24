import React, { useEffect, useRef, useState } from "react";
import LanguageList from "@/constant/allSelectionData/languageList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IoClose } from "react-icons/io5";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { handleGetUpdatedProfileAsync } from "@/store/features/auth/authApi";

interface IEditLanguagePopupProps {
  closeEditLanguage: () => void;
}

const EditLanguagePopup: React.FC<IEditLanguagePopupProps> = ({ closeEditLanguage }) => {
  const dispatch = useAppDispatch();
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);
  const [Language, setLanguage] = useState<string[]>([]);
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

  const formatLanguagesForDispatch = (LanguageArray: string[]): { [key: string]: string } => {
    const formatted: { [key: string]: string } = {};
    LanguageArray.forEach((language, index) => {
      formatted[`Language[${index}]`] = language;
    });
    return formatted;
  };

  const handleSave = async () => {
    const formData = new FormData();

    const formattedLanguage = formatLanguagesForDispatch(Language);
    Object.keys(formattedLanguage).forEach((key) => {
      formData.append(key, formattedLanguage[key]);
    });
    const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
    dispatch(handleGetUpdatedProfileAsync());
    toast.success(res.data.message);

    closeEditLanguage();
  };

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
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto sm:overflow-visible">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[700px]">
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">
                {Language && Language.length > 0 ? "Edit Language" : "Add Language"}
              </h1>

              <button
                onClick={closeEditLanguage}
                className="text-gray-500 hover:text-gray-700"
              >
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
                        className="ml-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm text-blue-500"
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
                    <ul className="absolute z-50 mt-[11px] max-h-[200px] w-full list-none overflow-y-auto border border-[#ccc] bg-white p-0">
                      {filteredLanguages.length > 0 ? (
                        filteredLanguages.map((language, index) => (
                          <li key={index}>
                            <button
                              className="h-full w-full px-4 py-1 text-start hover:bg-[#f7f7f7]"
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
              <button onClick={handleSave}>
                <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Save
                </span>
              </button>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeEditLanguage}
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
    </>
  );
};

export default EditLanguagePopup;
