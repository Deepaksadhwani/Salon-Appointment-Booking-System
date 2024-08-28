import { useEffect, useRef, useState } from "react";
import profileImage from "@/assets/profileImage.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/appStore";
import { updateUserProfile } from "@/store/slices/userSlice";

const UserProfile = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const adminKey = useRef<HTMLInputElement>(null)
  const photoUrl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string>("");
  let userImage = profileImage;
  const userData: any = useSelector((store: RootState) => store.user.userData);
  if (userData) {
    if (userData[0].photoUrl) userImage = userData[0].photoUrl;
  }

  const displayNameHandler = (event: any) => {
    setDisplayName(event.target.value);
  };

  const handleSaveProfile = async () => {
    setError("");
    const data: any = {
      fullName: displayName,
      role: adminKey.current?.value,
      photoUrl: photoUrl.current?.value,
    };
    console.log(data)
    try {
      dispatch(updateUserProfile(data));
      localStorage.setItem("userData", JSON.stringify({ name: displayName }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userDataStr = localStorage.getItem("userData");
    if (userDataStr) {
      const userDataParsed = JSON.parse(userDataStr);
      if (userData) {
        setDisplayName(userData[0].fullName);
      } else {
        setDisplayName(userDataParsed.name);
      }
    }
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center">
          {/* Profile Picture Section */}
          <div className="group relative">
            <img
              src={userImage}
              id="profile-picture"
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover shadow-lg"
            />
          </div>

          {/* Username Section */}
          <div className="mt-6 w-full">
          <label
              htmlFor="username"
              className="mb-2 block font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              onChange={displayNameHandler}
              type="text"
              value={displayName}
              className="w-full rounded-lg mb-2 border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          <label
              htmlFor="password"
              className="mb-2 block font-semibold text-gray-700"
            >
           administer Key
            </label>
            <input
              ref={adminKey}
              type="password"
              placeholder="Enter your admin key"
              className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <label
              htmlFor="username"
              className="mb-2 block font-semibold text-gray-700"
            >
              Photo Url
            </label>
            <input
              ref={photoUrl}
              type="text"
              placeholder="Enter your photo url"
              className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        
          </div>

          {/* Save Button */}

          {<p className="-mb-5 mt-3 font-medium text-red-800">{error}</p>}
          <button
            onClick={handleSaveProfile}
            className="mt-8 rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
