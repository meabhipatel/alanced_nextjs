import { IFreelanceProject } from "@/app/freelancer/page";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { errorLog } from "@/utils/errorLog";
import { timeAgo } from "@/utils/timeFunction";
import Link from "next/link";
import { FC, MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";

interface IProjectCardProps {
  project: IFreelanceProject;
  searchQuery: string;
}

const ProjectCard: FC<IProjectCardProps> = ({ project, searchQuery }) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(project.is_saved);

  const words = project.description.split(" ");
  const displayWords = isDescExpanded || words.length <= 50 ? words : words.slice(0, 50);

  const handleToggleDescription = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDescExpanded((prev) => !prev);
  };

  const handleToggleSaveProject = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    e.preventDefault();

    setIsSaved((prev) => !prev);

    try {
      const res = await axiosWithAuth.post(`/freelance/saved-projects/${id}`);

      if (res.data.isSaved) {
        toast.success("Job saved successfully!");
      } else {
        toast.success("Job unsaved successfully!");
      }
    } catch (error) {
      errorLog(error);
    }
  };

  function highlightText(text: string, query: string) {
    if (!query) {
      return text;
    }

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            style={{ backgroundColor: "#73cbfa" }}
          >
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }

  return (
    <Link href={`/view-project/details/${project.id}`}>
      <div className="cursor-pointer border-b border-t border-gray-200 border-opacity-30 px-4 py-5 hover:bg-[#F6FAFD] md:px-8">
        <div className="flex items-center justify-between">
          <p className="text-[18px] font-semibold text-[#0A142F]">
            {highlightText(project.title, searchQuery)}
          </p>
          <div className="flex items-center space-x-2 text-blue-600">
            <button
              className="h-8 w-8 rounded-full border border-gray-200 bg-white p-1"
              onClick={(e) => handleToggleSaveProject(e, project.id)}
            >
              {isSaved ? (
                <IoIosHeart className="text-xl" />
              ) : (
                <IoIosHeartEmpty className="text-xl" />
              )}
            </button>
          </div>
        </div>
        {project.is_applied && (
          <span className="flex w-fit items-center justify-center text-sm text-blue-600">
            Already Applied
          </span>
        )}

        <p className="py-3 text-[13px] text-[#0A142F] opacity-50">
          {highlightText(project.rate, searchQuery)} -{" "}
          {highlightText(project.experience_level?.replace(/_/g, " ") ?? "", searchQuery)} - Est.
          Budget: $
          {project.rate === "Hourly"
            ? project.min_hourly_rate + "/hr" + " - " + "$" + project.max_hourly_rate + "/hr"
            : project.fixed_budget}{" "}
          - Posted {timeAgo(project.project_creation_date ?? "")}
        </p>
        <p className="py-3 text-[14px] text-[#0A142F] text-opacity-50">
          Job Description: {highlightText(displayWords.join(" "), searchQuery)}
          {words.length > 50 && (
            <button
              className="cursor-pointer pl-2 text-sm font-semibold text-blue-500"
              onClick={handleToggleDescription}
            >
              {isDescExpanded ? "Less" : "More"}
            </button>
          )}
        </p>
        {JSON.parse(project.skills_required?.replace(/'/g, '"') ?? "").map(
          (skill: string, index: number) => (
            <Link
              key={index}
              href=""
            >
              <span className="my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-50">
                {highlightText(skill, searchQuery)}
              </span>
            </Link>
          )
        )}
        <p className="mr-1 py-1 text-[14px] text-[#0A142F]">
          Proposals : <span className="opacity-50">{project.total_bid_count}</span>
        </p>

        <IoLocationOutline className="text-md mr-1 inline-block" />
        <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
          {highlightText(
            project.project_owner_location ? project.project_owner_location : "NA",
            searchQuery
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
