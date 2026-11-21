require("dotenv").config();

const app = require("./app");
const sequelize = require("./src/config/db");

const User = require("./src/models/userModels");
const Bus = require("./src/models/busModels");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync();
    console.log("Database synced successfully!");

    // Add 3 Users
    await User.create({
      name: "Aarav Sharma",
      email: "aarav@example.com",
      phone: "9876543210",
      password: "password123",
    });

    await User.create({
      name: "Priya Verma",
      email: "priya@example.com",
      phone: "9876543211",
      password: "password123",
    });

    await User.create({
      name: "Rohan Singh",
      email: "rohan@example.com",
      phone: "9876543212",
      password: "password123",
    });

    // Add 2 Buses
    await Bus.create({
      busName: "HRTC Volvo",
      busNumber: "CH-01-TA-1234",
      busType: "AC_Sleeper",
      busStartTime: "2026-11-22 08:00:00",
      busDepartureTime: "2026-11-22 13:00:00",
      seatsAvailable: 40,
    });

    await Bus.create({
      busName: "Indo Canadian Express",
      busNumber: "PB-65-AB-5678",
      busType: "AC_Seater",
      busStartTime: "2026-11-22 14:30:00",
      busDepartureTime: "2026-11-22 19:30:00",
      seatsAvailable: 35,
    });

    console.log("Sample data inserted!");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    await sequelize.close();
    process.exit(1);
  }
};

startServer();
