import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addressPin from "/addressPinIcon.svg";
import PlaceGallery from "./placeGallery";
import BookingDates from "./BookingDates";

function BookingsPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(() => foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className=" my-8 ">
      <h1 className=" text-3xl ">{booking.place.title}</h1>
      <a
        className="my-2 block font-semibold underline w-fit"
        href={"https://maps.google.com/?q=" + booking.place.address}
        target="_blank"
      >
        <img
          src={addressPin}
          alt="Open new tab to address of unit"
          className="h-6 w-6 inline"
        />
        {booking.place.address}
      </a>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Information: </h2>
          <BookingDates booking={booking} nameClass="" />
        </div>
        <div className="bg-themeGold p-6 text-white rounded-2xl text-center">
          <div>Total Price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}

export default BookingsPage;
