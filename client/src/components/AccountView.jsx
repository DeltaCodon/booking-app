import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import userIcon from "/plainUserIcon.svg";
import houseIcon from "/plainHouse.svg";
import listIcon from "/listIcon.svg";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "flex justify-center inline-flex gap-1 py-2 px-6 ";
    if (type === subpage) {
      classes +=
        "bg-themeBlue rounded-full text-white gap-2 hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeGold";
    } else {
      classes += " bg-gray-300 rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
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
      {subpage === "profile" && (
        <div onClick={logout} className="text-center max-w-lg mx-auto">
          Logged in as ({user.name} {user.email})<br />
          <button className="bg-themeBlue w-24 rounded-full hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeGold h-7">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AccountPage;
