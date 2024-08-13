const Loading = () => {
  return (
    <div className="w-full">
      <div className="px-4 pt-4 md:px-8">
        <div className="flex items-center">
          <h1 className="mr-1 text-[21px] font-semibold text-[#031136]">
            Freelancers that Matches your Job
          </h1>
        </div>
        <div className="relative mt-3 w-40">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
          <div className="rounded-lg border-b-2 border-gray-600"></div>
        </div>
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:pl-3.5">
        {[...Array(6)].map((_, index) => {
          return (
            <div
              key={index}
              className="h-[400px] w-[95%] animate-pulse bg-gray-300 duration-300"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
