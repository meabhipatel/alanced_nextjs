import React, { FC, ReactNode } from "react";

interface IProps {
  status?: "accepted" | "rejected" | "pending";
  children: ReactNode;
  className?: string;
}

const InvitationStatus: FC<IProps> = ({ status = "accepted", children, className }) => {
  switch (status) {
    case "accepted":
      return (
        <div
          className={`flex h-6 min-w-12 items-center justify-center rounded-full border border-green-500 bg-green-50 px-2 text-sm font-semibold text-green-500 ${className}`}
        >
          {children}
        </div>
      );
    case "rejected":
      return (
        <div
          className={`flex h-6 min-w-12 items-center justify-center rounded-full border border-red-500 bg-red-50 px-2 text-sm font-semibold text-red-500 ${className}`}
        >
          {children}
        </div>
      );
    case "pending":
      return (
        <div
          className={`flex h-6 min-w-12 items-center justify-center rounded-full border border-yellow-500 bg-yellow-50 px-2 text-sm font-semibold text-yellow-500 ${className}`}
        >
          {children}
        </div>
      );
  }
};

export default InvitationStatus;
