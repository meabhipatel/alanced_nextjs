import Image from "next/image";
import { FC } from "react";
import { IoClose } from "react-icons/io5";

interface IProps {
  closePortfolio: () => void;
  project: any; // eslint-disable-line
}

const FreelancerPortfolioPopup: FC<IProps> = ({ closePortfolio, project }) => {
  return (
    <div className="fixed inset-0 z-10 mt-28 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[55%]">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-wrap text-[26px] font-normal text-[#031136]">
              {project.project_title}
            </h1>
            <button
              onClick={closePortfolio}
              className="text-gray-500 duration-300 hover:text-gray-700"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>
          <div className="mt-8">
            <Image
              src={"https://www.api.alanced.com" + project.images_logo}
              alt=""
              className="mx-auto h-[300px] w-[500px]"
              height={300}
              width={500}
            />
            <h1 className="font-cardo pt-5 text-left text-lg font-normal text-[#031136]">
              Skills and Deliverables
            </h1>
            <div className="mt-5 text-left">
              {JSON.parse(project.skills_used.replace(/'/g, '"')).map(
                (skill: string, index: number) => (
                  <div
                    className="my-2 mr-3 inline-block rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-4 py-1 text-sm font-semibold text-blue-800 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
                    key={index}
                  >
                    <p className="text-center">{skill}</p>
                  </div>
                )
              )}
            </div>
            <h1 className="font-cardo pt-6 text-left text-lg font-normal text-[#031136]">
              Project Description
            </h1>
            <h1 className="font-inter text-left text-sm font-normal text-blue-700">
              {project.category.replace(/_/g, " ")}
            </h1>
            <p className="font-inter py-4 text-left text-sm font-normal text-[#031136] opacity-50">
              {project.project_description}
            </p>
            <h1 className="font-inter text-left text-sm font-normal text-[#031136]">
              Project Link : <span className="text-blue-700">{project.project_link}</span>
            </h1>
            <div className="my-5 border-b opacity-70"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerPortfolioPopup;
