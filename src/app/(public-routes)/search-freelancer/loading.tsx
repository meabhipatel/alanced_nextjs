import React, { FC } from "react";

const Loading = () => {
  return (
    <div className="grid w-[70%] grid-cols-2 pl-3.5 md:w-full">
      {[...Array(6)].map((_, index) => {
        return (
          <div
            key={index}
            className="relative mt-4 h-[467px] w-[26vw] flex-shrink-0 cursor-pointer rounded-lg border-t border-opacity-30 px-4 py-5 shadow-lg hover:bg-[#F6FAFD] md:px-8"
          >
            <Skeleton
              height={90}
              width={90}
              style={{ borderRadius: "10%", float: "left" }}
            />
            <Skeleton
              height={20}
              width={200}
              style={{ marginLeft: 10, marginTop: 20 }}
            />
            <Skeleton
              height={20}
              width={200}
              style={{ marginLeft: 10, marginTop: 10 }}
            />
            <Skeleton
              height={200}
              width={300}
              style={{ marginTop: 20 }}
            />
            <Skeleton
              height={50}
              width={200}
              style={{ marginTop: 10 }}
            />
            <Skeleton
              height={35}
              width={80}
              style={{ marginTop: 20, float: "right" }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Loading;

interface ISkeletonProps {
  height: number;
  width: number;
  style: React.CSSProperties;
}

const Skeleton: FC<ISkeletonProps> = ({ height, width, style }) => {
  return (
    <div
      style={{
        height,
        width,
        ...style,
      }}
      className="animate-pulse bg-red-500 duration-300"
    ></div>
  );
};
