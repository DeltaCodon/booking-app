import React from "react";
import { Link, useLocation } from "react-router-dom";
import userIcon from "/plainUserIcon.svg";
import houseIcon from "/plainHouse.svg";
import listIcon from "/listIcon.svg";

const AccountNavigation = () => {
  const { pathname } = useLocation();

  function linkClasses(type = null) {
    let subpage = pathname.split("/")?.[2];
    if (subpage === undefined) {
      subpage = "profile";
    }

    let classes = "flex justify-center inline-flex gap-1 py-2 px-6 ";
    if (type === subpage) {
      classes +=
        "bg-themeBlue rounded-full text-white gap-2 hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeGold";
    } else {
      classes += " bg-gray-300 rounded-full";
    }
    return classes;
  }
  return (
    <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
      <Link className={linkClasses("profile")} to={"/account"}>
        <img src={userIcon} width={18} /> My Profile
      </Link>
      <Link className={linkClasses("bookings")} to={"/account/bookings"}>
        <img src={listIcon} width={20} />
        My Bookings
      </Link>
      <Link className={linkClasses("places")} to={"/account/places"}>
        <img src={houseIcon} width={23} />
        My Accommodation
      </Link>
    </nav>
  );
};

export default AccountNavigation;
