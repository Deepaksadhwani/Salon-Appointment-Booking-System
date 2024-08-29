import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import { FC } from "react";
import { Link } from "react-router-dom";
import { ListTodo } from "lucide-react";

interface DropDownMenuProps {
  onLogOutHandler: () => void;
}

const DropDownMenu: FC<DropDownMenuProps> = ({ onLogOutHandler }) => {
  return (
    <div className="absolute -bottom-[120px] right-8 z-20 flex w-[15vw] cursor-pointer flex-col rounded-lg border-2 border-black bg-gray-100 p-2 font-semibold text-gray-600">
      <div className="absolute -top-4 right-8 rotate-180 text-gray-100">⏷</div>
      <Link to="/profile" className="dropdown border-b-2">
        <p> Profile</p>
        <CgProfile />
      </Link>
      <Link to="/user-appointment" className="dropdown border-b-2">
        <p> Appointments</p>
        <ListTodo/>
      </Link>

      <button onClick={onLogOutHandler}  className="dropdown">
        <p> Logout</p>
        <BiLogOut />
      </button>
    </div>
  );
};

export default DropDownMenu;
