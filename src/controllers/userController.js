const User = require("../models/userModels");

// POST /users - Add a new user
const createUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const newUser = await User.create({ name, email, phone, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /users - Retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getAllUsers };
