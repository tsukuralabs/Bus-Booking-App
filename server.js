require("dotenv").config();

const app = require("./app");
const sequelize = require("./src/config/db");

const { User, Bus, Booking } = require("./src/models/associations");

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    await sequelize.sync({ alter: true });
    console.log("Database synced successfully!");

    // Find or Create 3 Users (prevents duplicate email errors on restart)
    const [user1] = await User.findOrCreate({
      where: { email: "aarav@example.com" },
      defaults: {
        name: "Aarav Sharma",
        phone: "9876543210",
        password: "password123",
      },
    });

    const [user2] = await User.findOrCreate({
      where: { email: "priya@example.com" },
      defaults: {
        name: "Priya Verma",
        phone: "9876543211",
        password: "password123",
      },
    });

    const [user3] = await User.findOrCreate({
      where: { email: "rohan@example.com" },
      defaults: {
        name: "Rohan Singh",
        phone: "9876543212",
        password: "password123",
      },
    });

    // Find or Create 2 Buses (prevents duplicate buses on restart)
    const [bus1] = await Bus.findOrCreate({
      where: { busNumber: "CH-01-TA-1234" },
      defaults: {
        busName: "HRTC Volvo",
        busType: "AC_Sleeper",
        busStartTime: "2026-11-22 08:00:00",
        busDepartureTime: "2026-11-22 13:00:00",
        seatsAvailable: 40,
      },
    });

    const [bus2] = await Bus.findOrCreate({
      where: { busNumber: "PB-65-AB-5678" },
      defaults: {
        busName: "Indo Canadian Express",
        busType: "AC_Seater",
        busStartTime: "2026-11-22 14:30:00",
        busDepartureTime: "2026-11-22 19:30:00",
        seatsAvailable: 35,
      },
    });

    // Find or Create Sample Bookings linked with busId (safe on server restarts)
    await Booking.findOrCreate({
      where: { busId: bus1.id, seatNumber: "A1" },
      defaults: {
        userId: user1.id,
        status: "confirmed",
      },
    });

    await Booking.findOrCreate({
      where: { busId: bus2.id, seatNumber: "B4" },
      defaults: {
        userId: user1.id,
        status: "pending",
      },
    });

    await Booking.findOrCreate({
      where: { busId: bus1.id, seatNumber: "C2" },
      defaults: {
        userId: user2.id,
        status: "confirmed",
      },
    });

    await Booking.findOrCreate({
      where: { busId: bus2.id, seatNumber: "D1" },
      defaults: {
        userId: user3.id,
        status: "confirmed",
      },
    });

    console.log("Sample bookings synced successfully!");

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
