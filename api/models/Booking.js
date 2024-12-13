const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, requred: true },
  MaxGuests: Number,
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  price: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
