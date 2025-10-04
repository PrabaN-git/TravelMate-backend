const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// Get all places
router.get("/", async (req, res) => {
  try {
    const places = await Place.find().sort({ name: 1 });
    res.status(200).json(places);
  } catch (err) {
    console.error("Error fetching places:", err);
    res.status(500).json({ message: "Failed to fetch places", error: err.message });
  }
});

// Get a single place by ID
router.get("/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json(place);
  } catch (err) {
    console.error("Error fetching place:", err);
    res.status(500).json({ message: "Failed to fetch place", error: err.message });
  }
});

// Add a new place
router.post("/", async (req, res) => {
  try {
    const { name, desc, price, img } = req.body;

    const newPlace = new Place({ name, desc, price, img });
    await newPlace.save();

    res.status(201).json({ message: "Place added successfully", place: newPlace });
  } catch (err) {
    console.error("Error adding place:", err);
    res.status(500).json({ message: "Failed to add place", error: err.message });
  }
});

// Update a place
router.put("/:id", async (req, res) => {
  try {
    const { name, desc, price, img } = req.body;

    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      { name, desc, price, img },
      { new: true }
    );

    if (!updatedPlace) return res.status(404).json({ message: "Place not found" });

    res.status(200).json({ message: "Place updated successfully", place: updatedPlace });
  } catch (err) {
    console.error("Error updating place:", err);
    res.status(500).json({ message: "Failed to update place", error: err.message });
  }
});

// Delete a place
router.delete("/:id", async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) return res.status(404).json({ message: "Place not found" });

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    console.error("Error deleting place:", err);
    res.status(500).json({ message: "Failed to delete place", error: err.message });
  }
});

module.exports = router;
