const express = require("express");
const router = express.Router();
const { createBus, getAvailableBuses } = require("../controllers/busController");

router.post("/buses", createBus);
router.get("/buses/available/:seats", getAvailableBuses);

module.exports = router;
