import AccountNavigation from "./AccountNavigation";
import plusIcon from "/plusIcon.svg";
import { Link } from "react-router-dom";

function PlacesPage() {
  return (
    <div>
      <AccountNavigation />
      <div className="text-center">
        <Link
          className="inline-flex bg-themeBlue py-2 px-6 rounded-full hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeGold"
          to={"/account/places/new"}
        >
          <img src={plusIcon} width={16} className="" /> Add new place
        </Link>
      </div>
    </div>
  );
}

export default PlacesPage;
