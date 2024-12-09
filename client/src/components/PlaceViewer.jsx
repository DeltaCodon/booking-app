import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import morePhotos from "/morePhotosIcon.svg";
import PhotoModal from "./PhotoModal";
import addressPin from "/addressPinIcon.svg";
import { finalDateTimeFunction } from "../utils/myTimeFormatter";
import BookingWidget from "./BookingWidget";

const PlaceViewer = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const dialog = useRef();

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
    <div className="mt-8 bg-slate-200 -mx-8 px-8 pt-5">
      <PhotoModal ref={dialog} allPhotos={place} onReset={resetModal} />
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex my-2 block font-semibold underline w-36"
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
      <div className="relative mb">
        <div
          id="middle"
          className="grid grid-cols-[1fr_1fr] gap-2 sm: grid sm:grid-cols-[2fr_1fr] md:grid md:grid-cols-[2fr_1fr] lg:grid lg:grid-cols-[2fr_1fr]"
        >
          <div className="">
            {place.media?.[0] && (
              <div className="w-fit">
                <img
                  className="rounded-l-2xl object-cover aspect-square w-full h-full min-w-[282.33px] min-h-[282.33px] sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full max-h-[525px] max-w-[525px]"
                  src={"http://localhost:4000/uploads/" + place.media?.[0]}
                  alt="Image of the unit"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.media?.[1] && (
              <img
                className="rounded-r-2xl object-cover aspect-square w-[50px] h-[50px] min-h-[132.77px] min-w-[130.77px] sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full max-h-[262px]"
                src={"http://localhost:4000/uploads/" + place.media?.[1]}
                alt="More images of the unit"
                onClick={() => showModal()}
              />
            )}
            <div className="overflow-hidden">
              {place.media?.[2] && (
                <img
                  className="rounded-r-2xl object-cover aspect-square relative top-2 w-[60px] h-[60px] min-h-[132.77px] min-w-[130.77px] sm:w-full sm:h-full md:w-full md:h-full lg:w-full lg:h-full  max-h-[262px]"
                  src={"http://localhost:4000/uploads/" + place.media?.[2]}
                  alt="More images of the unit"
                  onClick={() => showModal()}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-2 text-sm w-44 right-2 py-1 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 overflow-hidden"
          onClick={() => showModal()}
        >
          <img
            src={morePhotos}
            alt="Show more photos button"
            className="max-h-5 inline-block"
          />
          <p className="inline">&nbsp;Show more photos</p>
        </button>
      </div>
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
