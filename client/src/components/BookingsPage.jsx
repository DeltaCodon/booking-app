import React from "react";
import { useParams } from "react-router-dom";

function BookingsPage() {
  const { id } = useParams();

  return <div>Single Booking: {id}</div>;
}

export default BookingsPage;
