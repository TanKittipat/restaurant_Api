const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant.controller");
const { authJwt } = require("../middlewares");

// Create a restaurant Router
// POST http://localhost:5000/api/v1/restaurants/
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  restaurantController.create
);

// Get all restaurant Router
router.get("/", restaurantController.getAll);

// Get by ID restaurant Router
router.get("/:id", [authJwt.verifyToken], restaurantController.getById);

// Update restaurant Router
router.put(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdminOrMod],
  restaurantController.update
);

// Delete restaurant Router
router.delete(
  "/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  restaurantController.delete
);

module.exports = router;
