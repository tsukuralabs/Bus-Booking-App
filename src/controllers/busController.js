const { Op } = require("sequelize");
const Bus = require("../models/busModels");

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

module.exports = { createBus, getAvailableBuses };