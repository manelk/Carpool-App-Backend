const express = require("express");
const router = express.Router();

/**
 * User API Routes
 */

/**
 * Car API Routes
 */

const CarController = require("../controllers/car.controller");
router.post("/car", CarController.NewCar);
router.get("/carMakers", CarController.allCarsMakers);

/**
 * Ride API Routes
 */
const RideController = require("../controllers/rides.controller");
router.post("/ride", RideController.NewRide);
router.get("/ride", RideController.getAllRides);


module.exports = router;
