import { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import plusIcon from "/plusIcon.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

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
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place.title}
              className="flex cursor-pointer gap-3 mt-1 px-2 py-2 bg-gray-200 pt-3 rounded-2xl"
            >
              <div className="flex gap-2 w-32 h-32 rounded-2xl bg-gray-300 grow shrink-0">
                {place.media.length > 0 && (
                  <img
                    className="object-cover rounded-2xl"
                    src={"http://localhost:4000/uploads/" + place.media[0]}
                    alt="Pictures of unit"
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 whitespace-pre-line">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default PlacesPage;
