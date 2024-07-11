const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");

// Create a restaurant Router
// POST http://localhost:5000/api/v1/restaurants/
router.post("/", restaurantController.create);

module.exports = router;