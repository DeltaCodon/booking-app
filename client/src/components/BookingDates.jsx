import React from "react";
import calenderIcon from "/calenderIcon.svg";
import moonIcon from "/moonIcon.svg";
import {
  differenceInDate,
  finalDateTimeFunction,
} from "../utils/myTimeFormatter";

function BookingDates({ booking, nameClass = " " }) {
  return (
    <>
      <div className={" flex " + nameClass}>
        <p className="">
          {<img src={moonIcon} className="h-6 inline" />}
          {differenceInDate(booking.checkIn, booking.checkOut)} Nights: &nbsp;
          {<img src={calenderIcon} className="h-5 inline-block" />}
          <u>{finalDateTimeFunction(booking.checkIn)}</u>
          &nbsp; &rarr; &nbsp;
          {<img src={calenderIcon} className="h-5 inline-block" />}
          <u>{finalDateTimeFunction(booking.checkOut)}</u>
        </p>
      </div>
      {/* <div className="text-xl">
        <p>
          {<img src={creditCardIcon} className="h-7 inline" />} Total price: $
          {booking.price}
        </p>
      </div> */}
    </>
  );
}

export default BookingDates;
