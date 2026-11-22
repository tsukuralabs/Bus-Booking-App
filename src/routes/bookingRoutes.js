const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getUserBookings,
} = require("../controllers/bookingControllers");

router.post("/bookings", createBooking);
router.get("/bookings", getAllBookings);
router.get("/users/:userId/bookings", getUserBookings);

module.exports = router;
