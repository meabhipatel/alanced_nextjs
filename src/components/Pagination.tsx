"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

interface IProps {
  totalPages: number;
}

const Pagination: FC<IProps> = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) ?? 1);

  // ---> Updating Url search params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [currentPage]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      {totalPages > 1 && (
        <div className="m-4 flex items-center justify-end gap-6">
          <button
            onClick={prev}
            disabled={currentPage === 1}
            className="rounded-lg p-1"
            style={{
              backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
              border: "none",
            }}
          >
            <RxArrowLeft
              strokeWidth={0.3}
              className="text-2xl text-white"
            />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`px-0 py-1 ${
                  currentPage === pageNumber
                    ? "cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent"
                    : "cursor-pointer text-[14px] font-bold text-[#0A142F]"
                }`}
                onClick={() => {
                  setCurrentPage(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={next}
            disabled={currentPage === totalPages}
            className="rounded-lg p-1"
            style={{
              backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
              border: "none",
            }}
          >
            <RxArrowRight
              strokeWidth={0.3}
              className="text-2xl text-white"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
