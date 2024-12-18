import React, { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import axios from "axios";
import { finalDateTimeFunction } from "../utils/myTimeFormatter";

function BookingsView() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      console.log(response);
      setBookings(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div className=" flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
              <div className="w-48">
                {booking.place.media.length > 0 && (
                  <img
                    className="object-cover rounded-2xl"
                    src={
                      "http://localhost:4000/uploads/" + booking.place.media[0]
                    }
                    alt="Pictures of unit"
                  />
                )}
              </div>
              <div className="py-3">
                <h2 className="text-xl">{booking.place.title}</h2>
                Booked Date: {finalDateTimeFunction(booking.checkIn)} -&gt;{" "}
                {finalDateTimeFunction(booking.checkOut)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BookingsView;
