import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
      // setPlaces([
      //   ...response.data,
      //   ...response.data,
      //   ...response.data,
      //   ...response.data,
      //   ...response.data,
      //   ...response.data,
      // ]);
    });
  }, []);

  return (
    <div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 gird-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link key={place.title} to={"/place/" + place._id}>
            <div className="flex bg-gray-500 rounded-2xl">
              {place.media?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.media?.[0]}
                  alt="Image of place"
                />
              )}
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
            <div className="mt-1 ">
              <span className="font-bold">${place.prices}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
