import React, { useEffect } from "react";
import AccountNavigation from "./AccountNavigation";
import axios from "axios";

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
            <div>
              {booking.checkIn} -&gt; {booking.checkOut}
            </div>
          ))}
      </div>
    </div>
  );
}

export default BookingsView;
