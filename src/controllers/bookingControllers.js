const Booking = require("../models/bookingModels");
const User = require("../models/userModels");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { userId, busId, seatNumber, status } = req.body;

    const booking = await Booking.create({
      userId,
      busId,
      seatNumber,
      status,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all bookings along with user info
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: User, attributes: ["id", "name", "email", "phone"] }],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific user and all of their bookings (One-to-Many)
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const userWithBookings = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "phone"],
      include: [{ model: Booking }],
    });

    if (!userWithBookings) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userWithBookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
