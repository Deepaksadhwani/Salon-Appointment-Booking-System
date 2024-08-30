import { Skeleton } from "./ui/skeleton";

const UserProfileLoader = () => {
  return <div className="flex justify-center h-[100vh] items-center">
    <Skeleton  className="h-[30vw] bg-gray-200 w-[30vw]" />
  </div>
};

export default UserProfileLoader;
