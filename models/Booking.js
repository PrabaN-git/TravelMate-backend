const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
    fullName: String,
    email: String,
    phone: String,
    gender: String,
    age: Number,
    departureLocation: String,
    destination: String,
    departureDate: Date,
    returnDate: Date,
    tripType: String,
    travelers: Number,
    travelMode: String,
    preferredTime: String,
    seatClass: String,
    hotelBooking: Boolean,
    checkInDate: Date,
    checkOutDate: Date,
    roomType: String,
    numRooms: Number,
    paymentMethod: String,
    cardNumber: String,
    expiryDate: String,
    cvv: String,
    billingAddress: String,
    travelInsurance: Boolean,
    specialRequests: String,
    couponCode: String,
    termsAccepted: Boolean,
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
