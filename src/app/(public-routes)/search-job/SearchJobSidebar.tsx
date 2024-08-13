"use client";
import { useEffect, useState } from "react";
import CategoryList from "@/constant/allSelectionData/CategoryList";
import ExperienceLevel from "@/constant/allSelectionData/experienceLevel";
import ProjectRate from "@/constant/allSelectionData/ProjectRate";
import CityList from "@/constant/allSelectionData/cityList";
import SkillsList from "@/constant/allSelectionData/skillsList";
import { FaCheck } from "react-icons/fa6";

const SearchJobSidebar = () => {
  const [showAll, setShowAll] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllCity, setShowAllCity] = useState(false);

  const [cate] = useState(CategoryList);

  const [city] = useState(CityList);
  const [req_skill] = useState(SkillsList);

  const [expe] = useState(ExperienceLevel);
  const [type] = useState(ProjectRate);

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<string[]>([]);
  const [rateFilter, setRateFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // eslint-disable-line
  const [cityFilter, setCityFilter] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  /** --------------------------- */

  useEffect(() => {
    const queryParameters = [];

    if (categoryFilter.length > 0) {
      queryParameters.push(`category=${categoryFilter.join("&category=")}`);
    }

    if (skillFilter.length > 0) {
      queryParameters.push(`skills_required=${skillFilter.join("&skills_required=")}`);
    }

    if (expFilter.length > 0) {
      queryParameters.push(`experience_level=${expFilter.join("&experience_level=")}`);
    }

    if (rateFilter.length > 0) {
      queryParameters.push(`rate=${rateFilter.join("&rate=")}`);
    }

    if (cityFilter.length > 0) {
      queryParameters.push(`project_owner_location=${cityFilter.join("&project_owner_location=")}`);
    }

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&"); // eslint-disable-line
  }, [categoryFilter, skillFilter, expFilter, rateFilter, searchQuery, cityFilter, currentPage]);

  /** --------------------------- */
  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    if (e.target.checked) {
      setCategoryFilter((prevFilters) => [...prevFilters, category]);
    } else {
      setCategoryFilter((prevFilters) => prevFilters.filter((filter) => filter !== category));
    }
    setCurrentPage(1);
  };

  const handleSkillFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value;
    if (e.target.checked) {
      setSkillFilter((prevFilters) => [...prevFilters, skills]);
    } else {
      setSkillFilter((prevFilters) => prevFilters.filter((filter) => filter !== skills));
    }
    setCurrentPage(1);
  };

  const handleExpFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = e.target.value;
    if (e.target.checked) {
      setExpFilter((prevFilters) => [...prevFilters, exp]);
    } else {
      setExpFilter((prevFilters) => prevFilters.filter((filter) => filter !== exp));
    }
    setCurrentPage(1);
  };

  const handleRateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const protype = e.target.value;
    if (e.target.checked) {
      setRateFilter((prevFilters) => [...prevFilters, protype]);
    } else {
      setRateFilter((prevFilters) => prevFilters.filter((filter) => filter !== protype));
    }
    setCurrentPage(1);
  };

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    if (e.target.checked) {
      setCityFilter((prevFilters) => [...prevFilters, city]);
    } else {
      setCityFilter((prevFilters) => prevFilters.filter((filter) => filter !== city));
    }
    setCurrentPage(1);
  };

  const initialCategoryCount = 5; // Initial number of categories to show

  const [visibleCategories, setVisibleCategories] = useState(cate.slice(0, initialCategoryCount));

  const handleShowMore = () => {
    setVisibleCategories(cate); // Show all categories
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleCategories(cate.slice(0, initialCategoryCount)); // Show the initial count
    setShowAll(false);
  };

  const initialSkillCount = 5; // Initial number of skills to show

  const [visibleSkills, setVisibleSkills] = useState(req_skill.slice(0, initialSkillCount));

  const handleShowMoreSkills = () => {
    setVisibleSkills(req_skill); // Show all skills
    setShowAllSkills(true);
  };

  const handleShowLessSkills = () => {
    setVisibleSkills(req_skill.slice(0, initialSkillCount)); // Show the initial count
    setShowAllSkills(false);
  };

  const initialCityCount = 5; // Initial number of cities to show

  const [visibleCities, setVisibleCities] = useState(city.slice(0, initialCityCount));

  const handleShowMoreCity = () => {
    setVisibleCities(city); // Show all cities
    setShowAllCity(true);
  };

  const handleShowLessCity = () => {
    setVisibleCities(city.slice(0, initialCityCount)); // Show the initial count
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
                onChange={handleCategoryFilterChange}
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
            +{cate.length - initialCategoryCount} More
          </button>
        </div>
      )}
      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Experience Level</h1>
      </div>
      {expe.map((exp) => (
        <div
          key={exp}
          className="mt-4 flex flex-row"
        >
          <div className="basis-8/12">
            <label className="relative flex cursor-pointer items-center">
              <input
                className="hidden"
                type="checkbox"
                value={exp}
                onChange={handleExpFilterChange}
              />
              <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                <span className="checkmark hidden">
                  {/* <i className="bi bi-check-lg pr-0.5 pt-2"></i> */}
                  <FaCheck className="text-sm" />
                </span>
              </div>
              <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
              <span className="font-normal text-[#797979]">{exp.replace(/_/g, " ")}</span>
            </label>
          </div>
        </div>
      ))}
      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Project Type</h1>
      </div>
      {type.map((protype, index) => (
        <div
          key={index}
          className="mt-4 flex flex-row"
        >
          <div className="basis-8/12 text-left">
            <label className="relative mr-5 inline-flex cursor-pointer items-center">
              <input
                className="peer sr-only"
                type="checkbox"
                value={protype}
                onChange={handleRateFilterChange}
              />
              <div className="dark:bg-white-700 peer h-6 w-11 rounded-full border-2 border-blue-300 bg-white from-[#0909E9] to-[#00D4FF] after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:bg-gradient-to-r after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-focus:ring-blue-600 dark:border-gray-600"></div>
              <span className="ml-3 text-base font-normal text-[#797979]">{protype}</span>
            </label>
          </div>
        </div>
      ))}

      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Skills</h1>
      </div>
      {visibleSkills.map((skills) => (
        <div
          key={skills}
          className="mt-4 flex flex-row"
        >
          <div className="basis-8/12">
            <label className="relative flex cursor-pointer items-center">
              <input
                className="hidden"
                type="checkbox"
                value={skills}
                onChange={handleSkillFilterChange}
              />
              <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                <span className="checkmark hidden">
                  {/* <i className="bi bi-check-lg pr-0.5 pt-2"></i> */}
                  <FaCheck className="text-sm" />
                </span>
              </div>
              <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
              <span className="font-normal text-[#797979]">{skills}</span>
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
            +{req_skill.length - initialSkillCount} More
          </button>
        </div>
      )}
      <div>
        <h1 className="mt-10 text-left text-xl font-normal">Citys</h1>
      </div>
      {visibleCities.map((location, index) => (
        <div
          key={index}
          className="mt-4 flex flex-row"
        >
          <div className="basis-8/12">
            <label className="relative flex cursor-pointer items-center">
              <input
                className="hidden"
                type="checkbox"
                value={location}
                onChange={handleCityFilterChange}
              />
              <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                <span className="checkmark hidden">
                  {/* <i className="bi bi-check-lg pr-0.5 pt-2"></i> */}
                  <FaCheck className="text-sm" />
                </span>
              </div>
              <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
              <span className="font-normal text-[#797979]">{location}</span>
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
            +{city.length - initialCityCount} More
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchJobSidebar;
