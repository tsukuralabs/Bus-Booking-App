const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM("UPI", "credit_card", "debit_card", "net_banking"),
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM("pending", "success", "failed"),
    allowNull: false,
    defaultValue: "pending",
  },
}, {
  tableName: "payments",
  timestamps: true,
});

module.exports = Payment;
