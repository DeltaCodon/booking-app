import React from "react";
import plusIcon from "/plusIcon.svg";
import { Link, useParams } from "react-router-dom";

function PlacesPage() {
  const { action } = useParams();
  console.log(action);

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex bg-themeBlue py-2 px-6 rounded-full hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeGold"
            to={"/account/places/new"}
          >
            <img src={plusIcon} width={16} className="" /> Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form action="">
            <h2 className="text-2xl mt-4 ">Title</h2>
            <p className="text-gray-500 text-sm">
              Customize the name for your place
            </p>
            <input type="text" placeholder="ex: My lovely apt" />
            <h2 className="text-2xl mt-4 ">Address</h2>
            <p className="text-gray-500 text-sm">Address to your place</p>
            <input type="text" placeholder="address" />
            <h2 className="text-xl mt-4 ">Photos</h2>
            <p className="text-gray-500 text-sm">Take a look</p>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="place-self-center border bg-transparent rounded-full p-8">
                <img src={plusIcon} width={14} className="" />
              </button>
            </div>
          </form>
        </div>
      )}
      my places
    </div>
  );
}

export default PlacesPage;
