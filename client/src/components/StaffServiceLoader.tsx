import React from "react";
import { Skeleton } from "./ui/skeleton";

const StaffServiceLoader = () => {
  return (
    <div className="flex flex-col  items-center ">
      <Skeleton className="h-20 w-[50vw] bg-gray-200 mt-8" />
      <div className="flex flex-wrap gap-10 p-5 py-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton className="h-[60vh] w-[30vw] bg-gray-200"></Skeleton>
        ))}
      </div>
    </div>
  );
};

export default StaffServiceLoader;
