import React, { useState } from "react";
import CustomWidgetInfo from "./CustomWidgetInfo.jsx";
import { differenceInDate } from "../utils/myTimeFormatter.js";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  let numberOfNughts = 0;
  if (checkIn && checkOut) {
    numberOfNughts = differenceInDate(checkIn, checkOut);
  }

  return (
    <div className="w-9/12  ">
      <div className="bg-white shadow mt-4 -mr-6 py-3 px-5 rounded-2xl w-fit">
        <div className="text-2xl text-center">
          Price: ${place.prices} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className=" md:flex  rounded-2xl">
            <CustomWidgetInfo
              title="Check In"
              type="datetime-local"
              divClassName="rounded-t-2xl sm:rounded-none md:rounded-tl-2xl "
              className=""
              state={checkIn}
              setState={setCheckIn}
            />
            <CustomWidgetInfo
              title="Check Out"
              type="datetime-local"
              divClassName="md:rounded-tr-2xl"
              className=""
              state={checkOut}
              setState={setCheckOut}
            />
          </div>
          <CustomWidgetInfo
            title="Max Guests"
            type="number"
            divClassName="rounded-b-2xl"
            className=""
            state={maxGuests}
            setState={setMaxGuests}
          />
        </div>
        <button className="flex mt-4 basic-button place-self-center justify-center w-9/12">
          Book this place
          {numberOfNughts > 0 ? (
            <span>{numberOfNughts}</span>
          ) : (
            <span>"Check Start and End date again."</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
