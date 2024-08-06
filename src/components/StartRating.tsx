import { FC } from "react";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

interface IProps {
  rating: number;
}

const StarRating: FC<IProps> = ({ rating }) => {
  // Convert rating to nearest whole number without rounding up
  const wholeRating = Math.floor(rating);

  // Format rating with one decimal point
  const formattedRating = rating.toFixed(1);

  // Check if there's a half-star
  const hasHalfStar = rating - wholeRating !== 0;

  return (
    <div className="flex items-center">
      {/* Render filled stars */}
      {Array.from({ length: wholeRating }).map((_, index) => (
        <span
          key={index}
          className="mr-0.5 text-[16px] text-[#FFC107]"
        >
          <FaStar />
        </span>
      ))}

      {/* Render half star if applicable */}
      {hasHalfStar && (
        <span className="mr-0.5 text-[16px] text-[#FFC107]">
          <FaRegStarHalfStroke />
        </span>
      )}

      {/* Render empty stars */}
      {Array.from({ length: 5 - wholeRating - (hasHalfStar ? 1 : 0) }).map((_, index) => (
        <span
          key={index + wholeRating}
          className="mr-0.5 text-[16px] text-gray-300"
        >
          <FaRegStar />
        </span>
      ))}

      <p className="font-inter mx-1 inline-block text-[14px] text-[#0A142F] opacity-50">
        {formattedRating}
      </p>
    </div>
  );
};

export default StarRating;
