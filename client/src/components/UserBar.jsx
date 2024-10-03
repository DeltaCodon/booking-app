import React, { useContext } from "react";
import hamIcon from "/hamburgerIcon.svg";
import userIcon from "/userIcon.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const UserBar = () => {
  const { user } = useContext(UserContext);

  return (
    <Link
      to={user ? "/account" : "/login"}
      className="flex items-center gap-1 border border-stone-300 rounded-full px-2 bg-gray-200"
    >
      <div className="">
        <img src={hamIcon} width="30" />
      </div>
      <div className=" ">
        <img src={userIcon} className="rounded-full object-cover h-9 w-9" />
      </div>
      {!!user && <div>{user.name}</div>}
    </Link>
  );
};

export default UserBar;
