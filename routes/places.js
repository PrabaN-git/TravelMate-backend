// routes/places.js
const express = require("express");
const router = express.Router();
const Place = require("../models/Place");

// GET all places
router.get("/", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

// POST new place
router.post("/", async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update place
router.put("/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE place
router.delete("/:id", async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Place deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
