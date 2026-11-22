const { Op } = require("sequelize");
const { Bus, Booking, User } = require("../models/associations"); // Import from associations!

// POST /buses - Add a new bus
const createBus = async (req, res) => {
  try {
    const { busName, busNumber, busType, busStartTime, busDepartureTime, seatsAvailable } = req.body;
    const newBus = await Bus.create({
      busName,
      busNumber,
      busType,
      busStartTime,
      busDepartureTime,
      seatsAvailable,
    });
    res.status(201).json(newBus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /buses/available/:seats - Retrieve buses with seatsAvailable > :seats
const getAvailableBuses = async (req, res) => {
  try {
    const minSeats = Number(req.params.seats);

    const buses = await Bus.findAll({
      where: {
        seatsAvailable: {
          [Op.gt]: minSeats,
        },
      },
    });
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /buses/:id/bookings - Get all bookings for a specific bus with user details
const getBusBookings = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findByPk(id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const bookings = await Booking.findAll({
      where: { busId: id },
      attributes: ["id", "seatNumber"],
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });

    const formattedBookings = bookings.map((booking) => ({
      id: booking.id,
      seatNumber: booking.seatNumber,
      user: booking.User,
    }));

    return res.status(200).json(formattedBookings);
  } catch (error) {
    console.error("Error fetching bus bookings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBus, getAvailableBuses, getBusBookings };
