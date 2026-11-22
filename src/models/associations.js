const User = require("./userModels");
const Booking = require("./bookingModels");
const Bus = require("./busModels");

// One-to-Many Association
User.hasMany(Booking, {
  foreignKey: "userId",
});

Booking.belongsTo(User, {
  foreignKey: "userId",
});

// Bus <-> Booking (One-to-Many)
Bus.hasMany(Booking, {
  foreignKey: "busId",
});

Booking.belongsTo(Bus, {
  foreignKey: "busId",
});

module.exports = { User, Booking, Bus };
