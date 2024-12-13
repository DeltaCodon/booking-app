import React, { useState } from "react";
import CustomWidgetInfo from "./CustomWidgetInfo.jsx";
import { differenceInDate } from "../utils/myTimeFormatter.js";
import { Navigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");

  let dateRed = " ";

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInDate(checkIn, checkOut);
  }

  async function bookThisPlace() {
    const data = {
      checkIn,
      checkOut,
      maxGuests,
      fullName,
      mobile,
      place: place._id,
      price: (numberOfNights * place.prices).toFixed(2),
    };
    await axios.post("bookings", data);
    const bookingId = response.date._id;
    setRedirect(`/account/bookings/${bookingId}`);

    if (redirect) {
      return <Navigate to={redirect} />;
    }
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
              divClassName="border rounded-t-2xl sm:rounded-none md:rounded-tl-2xl "
              inputClassName=""
              state={checkIn}
              setState={setCheckIn}
            />
            <CustomWidgetInfo
              title="Check Out"
              type="datetime-local"
              divClassName="border md:rounded-tr-2xl"
              inputClassName={numberOfNights == undefined ? " bg-red-100" : " "}
              state={checkOut}
              setState={setCheckOut}
            />
          </div>
          <CustomWidgetInfo
            title="Max Guests"
            type="number"
            divClassName="border "
            inputClassName=""
            state={maxGuests}
            setState={setMaxGuests}
          />
          <div className="border rounded-b-2xl">
            <CustomWidgetInfo
              title="Guest Full Name"
              placeholder="John Doe"
              type="text"
              divClassName=""
              inputClassName=""
              state={fullName}
              setState={setFullName}
            />
            <CustomWidgetInfo
              title="Phone Number"
              placeholder=""
              type="tel"
              divClassName=" rounded-b-2xl"
              inputClassName=""
              state={mobile}
              setState={setMobile}
            />
          </div>
        </div>
        <button
          className="flex mt-4 basic-button place-self-center justify-center w-9/12"
          onClick={bookThisPlace}
        >
          {numberOfNights > 0 ? (
            <span>
              Book this place ${(numberOfNights * place.prices).toFixed(2)}
            </span>
          ) : (
            <span>"Check Start and End date again."</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
