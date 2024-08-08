import CityList from "@/constant/allSelectionData/CityList";
import ExperienceLevel from "@/constant/allSelectionData/ExperienceLevel";
import LanguageList from "@/constant/allSelectionData/LanguageList";
import SkillsList from "@/constant/allSelectionData/SkillsList";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface ISearchFreelancerSidebarProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setExpFilter: Dispatch<SetStateAction<string[]>>;
  setCityFilter: Dispatch<SetStateAction<string[]>>;
  setLanguageFilter: Dispatch<SetStateAction<string[]>>;
  setSkillFilter: Dispatch<SetStateAction<string[]>>;
}

const SearchFreelancerSidebar: FC<ISearchFreelancerSidebarProps> = ({
  setCurrentPage,
  setExpFilter,
  setCityFilter,
  setLanguageFilter,
  setSkillFilter,
}) => {
  const [expe] = useState(ExperienceLevel);
  const [city] = useState(CityList);
  const [req_skill] = useState(SkillsList);
  const [language] = useState(LanguageList);
  const initialSkillCount = 5; // Initial number of skills to show
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState(req_skill.slice(0, initialSkillCount));
  const [showAllCity, setShowAllCity] = useState(false);
  const initialCityCount = 5; // Initial number of cities to show
  const [visibleCities, setVisibleCities] = useState(city.slice(0, initialCityCount));
  const [showAllLanguage, setShowAllLanguage] = useState(false);
  const initialLanguageCount = 5; // Initial number of language to show
  const [visibleLanguages, setVisibleLanguages] = useState(language.slice(0, initialLanguageCount));

  const handleShowMoreSkills = () => {
    setVisibleSkills(req_skill); // Show all skills
    setShowAllSkills(true);
  };

  const handleShowLessSkills = () => {
    setVisibleSkills(req_skill.slice(0, initialSkillCount)); // Show the initial count
    setShowAllSkills(false);
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

  const handleShowMoreCity = () => {
    setVisibleCities(city); // Show all cities
    setShowAllCity(true);
  };

  const handleShowLessCity = () => {
    setVisibleCities(city.slice(0, initialCityCount)); // Show the initial count
    setShowAllCity(false);
  };

  const handleShowMoreLanguage = () => {
    setVisibleLanguages(language); // Show all Languages
    setShowAllLanguage(true);
  };

  const handleShowLessLanguage = () => {
    setVisibleLanguages(language.slice(0, initialLanguageCount)); // Show the initial count
    setShowAllLanguage(false);
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

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    if (e.target.checked) {
      setCityFilter((prevFilters) => [...prevFilters, city]);
    } else {
      setCityFilter((prevFilters) => prevFilters.filter((filter) => filter !== city));
    }
    setCurrentPage(1);
  };

  const handleLanguageFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const language = e.target.value;
    if (e.target.checked) {
      setLanguageFilter((prevFilters) => [...prevFilters, language]);
    } else {
      setLanguageFilter((prevFilters) => prevFilters.filter((filter) => filter !== language));
    }
    setCurrentPage(1);
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
                  onChange={handleSkillFilterChange}
                />
                <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                  <span className="checkmark hidden">
                    {/* <FaCheck className="text-sm" /> */}
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
              +{req_skill.length - initialSkillCount} More
            </button>
          </div>
        )}
      </div>

      <div className="location">
        <div>
          <h1 className="mt-10 bg-white text-left text-xl font-normal">Citys</h1>
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
              +{city.length - initialCityCount} More
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
                  onChange={handleLanguageFilterChange}
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
              +{language.length - initialLanguageCount} More
            </button>
          </div>
        )}
      </div>
      <div className="level">
        <div>
          <h1 className="mt-10 bg-white text-left text-xl font-normal">Experience Level</h1>
        </div>
        {expe.map((exp, index) => (
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
                  onChange={handleExpFilterChange}
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
