import React, { useEffect } from "react";
import { useState } from "react";
import PerkCards from "./PerkCards";
import PhotosUploader from "./PhotosUploader";
import { Navigate, useParams } from "react-router-dom";
import AccountNavigation from "./AccountNavigation";
import axios from "axios";

const PlacesForm = () => {
  const { id } = useParams();
  console.log({ id });

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [prices, setPrices] = useState();
  const [redirectPlaceList, setRedirectPlaceList] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.media);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrices(data.prices);
    });
  }, [id]);

  const checkDetails = [
    {
      name: "Check-in time",
      placeholder: "10:00",
      inputType: "datetime-local",
      state: checkIn,
      setState: setCheckIn,
    },
    {
      name: "Check-out time",
      placeholder: "10:00",
      inputType: "datetime-local",
      state: checkOut,
      setState: setCheckOut,
    },
    {
      name: "Max guest(s)",
      placeholder: "6",
      inputType: "number",
      state: maxGuests,
      setState: setMaxGuests,
    },
    {
      name: "Price per night (USD)",
      placeholder: "$150.99",
      inputType: "number",
      state: prices,
      setState: setPrices,
    },
  ];

  function iHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function iDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {iHeader(header)}
        {iDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      prices,
    };
    if (id) {
      //update
      await axios.put("/places", { id, ...placeData });
    } else {
      //new place
      await axios.put("/places", placeData);
    }
    setRedirectPlaceList(true);
  }

  if (redirectPlaceList) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNavigation />
      <div className="">
        <form action="" className="" onSubmit={savePlace}>
          {preInput("Title", "Customize the name for your place")}
          <input
            required
            type="text"
            placeholder="ex: My lovely apt"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          {preInput("Address", "Address to your place")}
          <input
            required
            type="text"
            placeholder="Address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />

          {preInput("Photos", "Let's see")}
          <PhotosUploader
            addedPhotos={addedPhotos}
            whenChanged={setAddedPhotos}
          />

          {preInput("Description", "Description of the place")}
          <textarea
            className="border shadow whitespace-pre-line"
            name=""
            cols="45"
            rows="4"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          ></textarea>

          {preInput("Perks", "Select all perks of your unit")}
          <PerkCards selected={perks} onSelected={setPerks} />

          {preInput(
            "Extra Info",
            "House rules, directions, minor details, etc."
          )}
          <textarea
            className="border shadow whitespace-pre-line"
            name=""
            cols="45"
            rows="4"
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          ></textarea>

          {preInput(
            "Check-in/out details:",
            "Add check-in, check-out, and maximum guests"
          )}
          <div className="grid gap-2 sm:grid-cols-3">
            {checkDetails.map((detail) => {
              return (
                <div key={detail.name}>
                  <h3 className="mt-2 -mb-1">{detail.name}</h3>
                  <input
                    required
                    type={detail.inputType}
                    placeholder={detail.placeholder}
                    value={detail.state}
                    min="0"
                    step="any"
                    onChange={(ev) => detail.setState(ev.target.value)}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex place-content-center">
            <button className="bg-themeBlue w-9/12 rounded-md text-center mt-2 py-1 border hover:border-themeBlue hover:bg-themeGold focus:outline-none focus:ring focus:ring-themeBlue">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlacesForm;
