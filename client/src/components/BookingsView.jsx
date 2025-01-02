import React, { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import calenderIcon from "/calenderIcon.svg";
import moonIcon from "/moonIcon.svg";
import creditCardIcon from "/creditCardIcon.svg";
import axios from "axios";
import {
  differenceInDate,
  finalDateTimeFunction,
} from "../utils/myTimeFormatter";
import { Link } from "react-router-dom";

function BookingsView() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className=" flex gap-4 bg-gray-200 rounded-2xl overflow-hidden "
            >
              <div className="w-52">
                {booking.place.media.length > 0 && (
                  <img
                    className="object-cover h-full rounded-l-2xl"
                    src={
                      "http://localhost:4000/uploads/" + booking.place.media[0]
                    }
                    alt="Pictures of unit"
                  />
                )}
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl font-semibold">{booking.place.title}</h2>
                <div className=" flex border-t border-gray-300 mt-2 py-2">
                  <p className="">
                    {<img src={moonIcon} className="h-6 inline" />}
                    {differenceInDate(booking.checkIn, booking.checkOut)}{" "}
                    Nights: &nbsp;
                    {<img src={calenderIcon} className="h-5 inline-block" />}
                    <u>{finalDateTimeFunction(booking.checkIn)}</u>
                    &nbsp; &rarr; &nbsp;
                    {<img src={calenderIcon} className="h-5 inline-block" />}
                    <u>{finalDateTimeFunction(booking.checkOut)}</u>
                  </p>
                </div>
                <div className="text-xl">
                  <p>
                    {<img src={creditCardIcon} className="h-7 inline" />} Total
                    price: ${booking.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BookingsView;
