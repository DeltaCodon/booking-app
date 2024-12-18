const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, requred: true },
  maxGuests: Number,
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  price: Number,
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
