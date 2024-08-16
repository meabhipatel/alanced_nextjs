"use client";
import cityList from "@/constant/allSelectionData/cityList";
import experienceLevel from "@/constant/allSelectionData/experienceLevel";
import languageList from "@/constant/allSelectionData/languageList";
import skillsList from "@/constant/allSelectionData/skillsList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface ISearchFreelancerSidebarProps {}

const SearchFreelancerSidebar: FC<ISearchFreelancerSidebarProps> = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  //---------------------
  const [selectedExpLevel, setSelectedExpLevel] = useState<string[]>(
    searchParams.getAll("explevel") ?? []
  );
  const [selectedCity, setSelectedCity] = useState<string[]>(searchParams.getAll("address") ?? []);
  const [selectedlanguage, setSelectedLanguage] = useState<string[]>(
    searchParams.getAll("language") ?? []
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    searchParams.getAll("skills") ?? []
  );

  // --------------------
  const initialSkillCount = 5;
  const initialCityCount = 5;
  const initialLanguageCount = 5;
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState(skillsList.slice(0, initialSkillCount));
  const [showAllCity, setShowAllCity] = useState(false);
  const [visibleCities, setVisibleCities] = useState(cityList.slice(0, initialCityCount));
  const [showAllLanguage, setShowAllLanguage] = useState(false);
  const [visibleLanguages, setVisibleLanguages] = useState(
    languageList.slice(0, initialLanguageCount)
  );

  // ---> Updating Url search params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedSkills.length > 0) {
      params.delete("skills");
      selectedSkills.forEach((skill) => {
        params.append("skills", skill);
      });
    } else {
      params.delete("skills");
    }

    if (selectedExpLevel.length > 0) {
      params.delete("explevel");
      selectedExpLevel.forEach((exp) => {
        params.append("explevel", exp);
      });
    } else {
      params.delete("explevel");
    }

    if (selectedCity.length > 0) {
      params.delete("address");
      selectedCity.forEach((exp) => {
        params.append("address", exp);
      });
    } else {
      params.delete("address");
    }

    if (selectedlanguage.length > 0) {
      params.delete("language");
      selectedlanguage.forEach((exp) => {
        params.append("language", exp);
      });
    } else {
      params.delete("language");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedSkills, selectedExpLevel, selectedCity, selectedlanguage]);

  const handleShowMoreSkills = () => {
    setVisibleSkills(skillsList);
    setShowAllSkills(true);
  };

  const handleShowLessSkills = () => {
    setVisibleSkills(skillsList.slice(0, initialSkillCount));
    setShowAllSkills(false);
  };

  const handleSelectSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value;
    if (e.target.checked) {
      setSelectedSkills((prevFilters) => [...prevFilters, skills]);
    } else {
      setSelectedSkills((prevFilters) => prevFilters.filter((filter) => filter !== skills));
    }
  };

  const handleShowMoreCity = () => {
    setVisibleCities(cityList);
    setShowAllCity(true);
  };

  const handleShowLessCity = () => {
    setVisibleCities(cityList.slice(0, initialCityCount));
    setShowAllCity(false);
  };

  const handleShowMoreLanguage = () => {
    setVisibleLanguages(languageList);
    setShowAllLanguage(true);
  };

  const handleShowLessLanguage = () => {
    setVisibleLanguages(languageList.slice(0, initialLanguageCount));
    setShowAllLanguage(false);
  };

  const handleSelectExpLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = e.target.value;
    if (e.target.checked) {
      setSelectedExpLevel((prevFilters) => [...prevFilters, exp]);
    } else {
      setSelectedExpLevel((prevFilters) => prevFilters.filter((filter) => filter !== exp));
    }
  };

  const handleSelectCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    if (e.target.checked) {
      setSelectedCity((prevFilters) => [...prevFilters, city]);
    } else {
      setSelectedCity((prevFilters) => prevFilters.filter((filter) => filter !== city));
    }
  };

  const handleSelectLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const language = e.target.value;
    if (e.target.checked) {
      setSelectedLanguage((prevFilters) => [...prevFilters, language]);
    } else {
      setSelectedLanguage((prevFilters) => prevFilters.filter((filter) => filter !== language));
    }
  };

  return (
    <div className="sticky top-24 hidden h-[90vh] w-full overflow-y-auto bg-[#FFFFFF] py-8 pt-3 text-left md:w-[25%] lg:block">
      <div className="skills">
        <div>
          <h1 className="bg-white text-left text-xl font-normal">Skills</h1>
        </div>
        {visibleSkills.map((skill, index) => (
          <div
            key={index}
            className="mt-4 flex flex-row"
          >
            <div className="basis-8/12">
              <label className="relative flex cursor-pointer items-center">
                <input
                  className="hidden"
                  type="checkbox"
                  value={skill}
                  checked={selectedSkills.includes(skill)}
                  onChange={handleSelectSkills}
                />
                <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                  <span className="checkmark hidden">
                    <FaCheck className="text-sm" />
                  </span>
                </div>
                <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                <span className="font-normal text-[#797979]">{skill}</span>
              </label>
            </div>
          </div>
        ))}
        {showAllSkills ? (
          <div>
            <button
              className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
              onClick={handleShowLessSkills}
            >
              Show Less
            </button>
          </div>
        ) : (
          <div>
            <button
              className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
              onClick={handleShowMoreSkills}
            >
              +{skillsList.length - initialSkillCount} More
            </button>
          </div>
        )}
      </div>

      <div className="location">
        <div>
          <h1 className="mt-10 bg-white text-left text-xl font-normal">Citys</h1>
        </div>

        {visibleCities.map((city, index) => (
          <div
            key={index}
            className="mt-4 flex flex-row"
          >
            <div className="basis-8/12">
              <label className="relative flex cursor-pointer items-center">
                <input
                  className="hidden"
                  type="checkbox"
                  value={city}
                  checked={selectedCity.includes(city)}
                  onChange={handleSelectCity}
                />
                <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                  <span className="checkmark hidden">
                    <FaCheck className="text-sm" />
                  </span>
                </div>
                <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                <span className="font-normal text-[#797979]">{city}</span>
              </label>
            </div>
          </div>
        ))}
        {showAllCity ? (
          <div>
            <button
              className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
              onClick={handleShowLessCity}
            >
              Show Less
            </button>
          </div>
        ) : (
          <div>
            <button
              className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
              onClick={handleShowMoreCity}
            >
              +{cityList.length - initialCityCount} More
            </button>
          </div>
        )}
      </div>
      <div className="language">
        <div>
          <h1 className="mt-10 bg-white text-left text-xl font-normal">Languages</h1>
        </div>
        {visibleLanguages.map((language, index) => (
          <div
            key={index}
            className="mt-4 flex flex-row"
          >
            <div className="basis-8/12">
              <label className="relative flex cursor-pointer items-center">
                <input
                  className="hidden"
                  type="checkbox"
                  value={language}
                  checked={selectedlanguage.includes(language)}
                  onChange={handleSelectLanguage}
                />
                <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                  <span className="checkmark hidden">
                    <FaCheck className="text-sm" />
                  </span>
                </div>
                <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                <span className="font-normal text-[#797979]">{language}</span>
              </label>
            </div>
          </div>
        ))}
        {showAllLanguage ? (
          <div>
            <button
              className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
              onClick={handleShowLessLanguage}
            >
              Show Less
            </button>
          </div>
        ) : (
          <div>
            <button
              className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
              onClick={handleShowMoreLanguage}
            >
              +{languageList.length - initialLanguageCount} More
            </button>
          </div>
        )}
      </div>
      <div className="level">
        <div>
          <h1 className="mt-10 bg-white text-left text-xl font-normal">Experience Level</h1>
        </div>
        {experienceLevel.map((exp, index) => (
          <div
            key={index}
            className="mt-4 flex flex-row"
          >
            <div className="basis-8/12">
              <label className="relative flex cursor-pointer items-center">
                <input
                  className="hidden"
                  type="checkbox"
                  value={exp}
                  checked={selectedExpLevel.includes(exp)}
                  onChange={handleSelectExpLevel}
                />
                <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                  <span className="checkmark hidden">
                    <FaCheck className="text-sm" />
                  </span>
                </div>
                <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                <span className="font-normal text-[#797979]">{exp}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFreelancerSidebar;
