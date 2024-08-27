import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, removeToken, removeUserData } from "@/store/slices/userSlice";
import DropDownMenu from "@/components/DropDownMenu";
import { AppDispatch, RootState } from "@/store/appStore";
import logo from "@/assets/navlogo.png";
import profileImage from "@/assets/profileImage.jpeg";
const Navbar = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("Profile");
  let userImage = profileImage;
  const userData: any = useSelector((store: RootState) => store.user.userData);
  if (userData) {
    if (userData[0].photoUrl) userImage = userData[0].photoUrl;
  }
  const activeClass = "text-yellow-400";

  const logoutHandler = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      localStorage.clear();
      dispatch(removeUserData());
      dispatch(removeToken());

      navigate("/");
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  };
useEffect(() => {
  dispatch(getUser());
}, [dispatch]);

useEffect(() => {
  if (userData) {
    setDisplayName(userData[0]?.fullName || "Profile");
  }
}, [userData]);
  console.log(displayName)

  return loading ? (
    <div>Loading....</div>
  ) : (
    <div className="relative flex items-center justify-between bg-[#1E201E] px-4 py-2 sm:px-10">
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt=""
          className="hidden w-20 cursor-pointer rounded-full shadow-md shadow-cyan-200 transition-all duration-100 lg:block"
        />
      </div>
      <div>
        <h1 className="block text-4xl font-semibold italic tracking-tight text-yellow-500 transition-all duration-1000 sm:block">
          Sunshine Salon
        </h1>
      </div>
      <div className="flex items-center space-x-3 text-xl font-semibold text-white">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : undefined)}
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? activeClass : undefined)}
          onClick={() => setIsOpen(false)}
        >
          Services
        </NavLink>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="group/testing hidden cursor-pointer select-none items-center space-x-3 rounded-md border-2 border-black bg-yellow-300 px-3 py-3 font-semibold text-[#000000] transition-all duration-200 hover:scale-[1.04] sm:flex"
        >
          <img src={userImage} className="h-10 w-10" alt="" />
          <p className="">{displayName}</p>
          <span className="duration-700 group-hover/testing:rotate-180">⮟</span>
        </div>
        <div>
          <img
            className="block w-16 rounded-lg bg-yellow-300 p-1 transition-all duration-300 hover:scale-110 sm:hidden"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
            alt="hamburger icon"
          />
        </div>

        {isOpen && <DropDownMenu onLogOutHandler={logoutHandler} />}
      </div>
    </div>
  );
};

export default Navbar;
