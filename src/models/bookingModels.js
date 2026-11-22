// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Booking = sequelize.define(
//   "Booking",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "users",
//         key: "id",
//       },
//       onDelete: "CASCADE",
//       onUpdate: "CASCADE",
//     },
//     busId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     seatNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
//       allowNull: false,
//       defaultValue: "pending",
//     },
//   },
//   {
//     tableName: "bookings",
//     timestamps: true,
//   },
// );

// module.exports = Booking;


const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "buses",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
  }
);

module.exports = Booking;
