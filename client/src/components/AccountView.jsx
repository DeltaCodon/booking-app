import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "./AccountNavigation";

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
    return `Loading... \n Refresh after 5 seconds`;
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="relative h-screen max-h-[40rem]">
      <AccountNavigation />
      {subpage === "profile" && (
        <div
          onClick={logout}
          className="text-center  mx-auto absolute bottom-0 left-[32%] right-[30%] grow "
        >
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
