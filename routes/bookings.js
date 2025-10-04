const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Place = require("../models/Place"); // if you want place name

// Get all bookings (for admin)
router.get("/", async (req, res) => {
  try {
    // Fetch bookings
    const bookings = await Booking.find().sort({ createdAt: -1 });

    // Map place ObjectId to place name
    const bookingsWithPlaceName = await Promise.all(
      bookings.map(async (b) => {
        let placeName = "N/A";
        if (b.place) {
          const place = await Place.findById(b.place);
          if (place) placeName = place.name;
        }
        return {
          _id: b._id,
          fullName: b.fullName,
          email: b.email,
          phone: b.phone,
          gender: b.gender,
          age: b.age,
          departureLocation: b.departureLocation,
          destination: b.destination,
          departureDate: b.departureDate,
          returnDate: b.returnDate,
          travelers: b.travelers,
          travelMode: b.travelMode,
          seatClass: b.seatClass,
          hotelBooking: b.hotelBooking,
          status: b.status || "Completed",
          placeName
        };
      })
    );

    res.status(200).json(bookingsWithPlaceName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
});

module.exports = router;
