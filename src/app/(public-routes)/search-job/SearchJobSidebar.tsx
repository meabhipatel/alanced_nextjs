"use client";
import { useEffect, useState } from "react";
import categoryList from "@/constant/allSelectionData/categoryList";
import experienceLevel from "@/constant/allSelectionData/experienceLevel";
import projectRate from "@/constant/allSelectionData/projectRate";
import cityList from "@/constant/allSelectionData/cityList";
import skillsList from "@/constant/allSelectionData/skillsList";
import { FaCheck } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchJobSidebar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  //---------------------
  const [selectedExpLevel, setSelectedExpLevel] = useState<string[]>(
    searchParams.getAll("explevel") ?? []
  );
  const [selectedCity, setSelectedCity] = useState<string[]>(searchParams.getAll("city") ?? []);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(
    searchParams.getAll("category") ?? []
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    searchParams.getAll("skills") ?? []
  );
  const [selectedRateType, setSelectedRateType] = useState<string[]>(
    searchParams.getAll("rate") ?? []
  );
  // --------------------
  const [showAll, setShowAll] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllCity, setShowAllCity] = useState(false);
  // --------------------
  const initialCategoryCount = 5;
  const initialSkillCount = 5;
  const initialCityCount = 5;

  /** ---> Updating Url search params */
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
      params.delete("city");
      selectedCity.forEach((exp) => {
        params.append("city", exp);
      });
    } else {
      params.delete("city");
    }

    if (selectedCategory.length > 0) {
      params.delete("category");
      selectedCategory.forEach((exp) => {
        params.append("category", exp);
      });
    } else {
      params.delete("category");
    }

    if (selectedRateType.length > 0) {
      params.delete("rate");
      selectedRateType.forEach((exp) => {
        params.append("rate", exp);
      });
    } else {
      params.delete("rate");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedCategory, selectedSkills, selectedExpLevel, selectedRateType, selectedCity]);

  /** --------------------------- */
  const handleSelectCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    if (e.target.checked) {
      setSelectedCategory((prevFilters) => [...prevFilters, category]);
    } else {
      setSelectedCategory((prevFilters) => prevFilters.filter((filter) => filter !== category));
    }
  };

  const handleSelectSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value;
    if (e.target.checked) {
      setSelectedSkills((prevFilters) => [...prevFilters, skills]);
    } else {
      setSelectedSkills((prevFilters) => prevFilters.filter((filter) => filter !== skills));
    }
  };

  const handleSelectExpLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = e.target.value;
    if (e.target.checked) {
      setSelectedExpLevel((prevFilters) => [...prevFilters, exp]);
    } else {
      setSelectedExpLevel((prevFilters) => prevFilters.filter((filter) => filter !== exp));
    }
  };

  const handleSelectProjectRateType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const protype = e.target.value;
    if (e.target.checked) {
      setSelectedRateType((prevFilters) => [...prevFilters, protype]);
    } else {
      setSelectedRateType((prevFilters) => prevFilters.filter((filter) => filter !== protype));
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

  const [visibleCategories, setVisibleCategories] = useState(
    categoryList.slice(0, initialCategoryCount)
  );

  const handleShowMore = () => {
    setVisibleCategories(categoryList);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleCategories(categoryList.slice(0, initialCategoryCount));
    setShowAll(false);
  };

  const [visibleSkills, setVisibleSkills] = useState(skillsList.slice(0, initialSkillCount));

  const handleShowMoreSkills = () => {
    setVisibleSkills(skillsList);
    setShowAllSkills(true);
  };

  const handleShowLessSkills = () => {
    setVisibleSkills(skillsList.slice(0, initialSkillCount));
    setShowAllSkills(false);
  };

  const [visibleCities, setVisibleCities] = useState(cityList.slice(0, initialCityCount));

  const handleShowMoreCity = () => {
    setVisibleCities(cityList);
    setShowAllCity(true);
  };

  const handleShowLessCity = () => {
    setVisibleCities(cityList.slice(0, initialCityCount));
    setShowAllCity(false);
  };

  return (
    <div className="sticky top-24 hidden h-[90vh] w-full overflow-y-auto bg-[#FFFFFF] py-8 pt-3 text-left md:w-[25%] lg:block">
      <div>
        <h1 className="text-left text-xl font-normal">Category</h1>
      </div>
      {visibleCategories.map((category, index) => (
        <div
          key={index}
          className="mt-4 flex flex-row"
        >
          <div className="basis-10/12">
            <label className="relative flex cursor-pointer items-center">
              <input
                className="hidden"
                type="checkbox"
                value={category}
                checked={selectedCategory.includes(category)}
                onChange={handleSelectCategory}
              />
              <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                <span className="checkmark hidden">
                  {/* <i className="bi bi-check-lg pr-0.5 pt-2"></i> */}
                  <FaCheck className="text-sm" />
                </span>
              </div>
              <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
              <span className="font-normal text-[#797979]">{category}</span>
            </label>
          </div>
        </div>
      ))}
      {showAll ? (
        <div>
          <button
            className="mt-5 cursor-pointer text-left text-xl font-normal"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        </div>
      ) : (
        <div>
          <button
            className="mt-5 cursor-pointer text-left text-xl font-normal"
            onClick={handleShowMore}
          >
            +{categoryList.length - initialCategoryCount} More
          </button>
        </div>
      )}
      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Experience Level</h1>
      </div>
      {experienceLevel.map((expLevel) => (
        <div
          key={expLevel}
          className="mt-4 flex flex-row"
        >
          <div className="basis-8/12">
            <label className="relative flex cursor-pointer items-center">
              <input
                className="hidden"
                type="checkbox"
                value={expLevel}
                checked={selectedExpLevel.includes(expLevel)}
                onChange={handleSelectExpLevel}
              />
              <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                <span className="checkmark hidden">
                  {/* <i className="bi bi-check-lg pr-0.5 pt-2"></i> */}
                  <FaCheck className="text-sm" />
                </span>
              </div>
              <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
              <span className="font-normal text-[#797979]">{expLevel.replace(/_/g, " ")}</span>
            </label>
          </div>
        </div>
      ))}
      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Project Type</h1>
      </div>
      {projectRate.map((rateType, index) => (
        <div
          key={index}
          className="mt-4 flex flex-row"
        >
          <div className="basis-8/12 text-left">
            <label className="relative mr-5 inline-flex cursor-pointer items-center">
              <input
                className="peer sr-only"
                type="checkbox"
                value={rateType}
                checked={selectedRateType.includes(rateType)}
                onChange={handleSelectProjectRateType}
              />
              <div className="dark:bg-white-700 peer h-6 w-11 rounded-full border-2 border-blue-300 bg-white from-[#0909E9] to-[#00D4FF] after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:bg-gradient-to-r after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-focus:ring-blue-600 dark:border-gray-600"></div>
              <span className="ml-3 text-base font-normal text-[#797979]">{rateType}</span>
            </label>
          </div>
        </div>
      ))}

      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Skills</h1>
      </div>
      {visibleSkills.map((skill) => (
        <div
          key={skill}
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
            className="mt-5 cursor-pointer text-left text-xl font-normal"
            onClick={handleShowLessSkills}
          >
            Show Less
          </button>
        </div>
      ) : (
        <div>
          <button
            className="mt-5 cursor-pointer text-left text-xl font-normal"
            onClick={handleShowMoreSkills}
          >
            +{skillsList.length - initialSkillCount} More
          </button>
        </div>
      )}
      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Citys</h1>
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
            className="mt-5 cursor-pointer text-left text-xl font-normal"
            onClick={handleShowLessCity}
          >
            Show Less
          </button>
        </div>
      ) : (
        <div>
          <button
            className="mt-5 cursor-pointer text-left text-xl font-normal"
            onClick={handleShowMoreCity}
          >
            +{cityList.length - initialCityCount} More
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchJobSidebar;
