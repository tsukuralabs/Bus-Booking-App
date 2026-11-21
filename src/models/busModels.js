const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Bus = sequelize.define("Bus", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  busName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  busNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  busType: {
    type: DataTypes.ENUM("AC_Sleeper", "Non_AC_Sleeper", "AC_Seater", "Non_AC_Seater"),
    allowNull: false,
    defaultValue: "AC_Seater",
  },
  busStartTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  busDepartureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  seatsAvailable: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: "buses",
  timestamps: true,
});

module.exports = Bus;
