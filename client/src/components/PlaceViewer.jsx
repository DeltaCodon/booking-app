import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import addressPin from "/addressPinIcon.svg";
import { finalDateTimeFunction } from "../utils/myTimeFormatter";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "./placeGallery";

const PlaceViewer = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  function showModal() {
    dialog.current.open();
  }
  function resetModal() {
    dialog.current.close();
  }

  return (
    <div className="mt-8 bg-slate-300 -mx-8 px-8 pt-5">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex my-2 block font-semibold underline w-fit"
        href={"https://maps.google.com/?q=" + place.address}
        target="_blank"
      >
        <img
          src={addressPin}
          alt="Open new tab to address of unit"
          className="h-6 w-6"
        />
        {place.address}
      </a>
      <PlaceGallery place={place} />

      {/*Remeber this "whitespace-pre-line" BS for textareas and the tag for the text. You'll need it again one day */}
      <div className="grid md:grid-cols-[2fr_1fr] gap-4 mt-6 mb-4">
        <div className="">
          <div className=" my-4 whitespace-pre-line text-wrap">
            <h2 className="font-semibold text-2xl ">Description</h2>
            {place.description}
          </div>
          <b>Check-In: </b>
          {finalDateTimeFunction(place.checkIn)}
          <br />
          <b>Check-Out: </b>
          {finalDateTimeFunction(place.checkOut)}
          <br />
          <b>Max Guests: </b>
          {place.maxGuests}
          <br />
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className=" bg-white -mx-8 px-7 py-8 border-t border-gray-300">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info: </h2>
          <div className="whitespace-pre-line mb-4 mt-1 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceViewer;
