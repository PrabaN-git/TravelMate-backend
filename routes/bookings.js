const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Place = require("../models/Place");

// Create a new booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking({
      userId: req.body.userId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      age: req.body.age,
      departureLocation: req.body.departureLocation,
      destination: req.body.destination,
      departureDate: req.body.departureDate,
      returnDate: req.body.returnDate,
      tripType: req.body.tripType,
      travelers: req.body.travelers,
      travelMode: req.body.travelMode,
      preferredTime: req.body.preferredTime,
      seatClass: req.body.seatClass,
      hotelBooking: req.body.hotelBooking,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      roomType: req.body.roomType,
      numRooms: req.body.numRooms,
      paymentMethod: req.body.paymentMethod,
      cardNumber: req.body.cardNumber,
      expiryDate: req.body.expiryDate,
      cvv: req.body.cvv,
      billingAddress: req.body.billingAddress,
      travelInsurance: req.body.travelInsurance,
      specialRequests: req.body.specialRequests,
      couponCode: req.body.couponCode,
      termsAccepted: req.body.termsAccepted,
      place: req.body.placeId // optional: include the place id
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
});

// GET all bookings for admin with populated user & place info
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username email") // populate user info
      .populate("place", "name");          // populate place info

    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
});

module.exports = router;
