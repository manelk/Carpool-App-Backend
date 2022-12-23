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
router.get("/car/getAllCars", CarController.getAllCars);
router.get("/car/getCarById/:id_car", CarController.getCarById);
router.get("/carMakers", CarController.allCarsMakers);
router.get("/getManufacturer", CarController.getManufacturer);
router.patch("/car/editCarInformation/:id_car", CarController.editCarInformation);
router.delete("/car/deleteCarInformation/:id_car", CarController.deleteCarInformation);

/**
 * Ride API Routes
 */
const RideController = require("../controllers/rides.controller");
router.post("/ride", RideController.NewRide);
router.get("/ride", RideController.getAllRides);
router.get("/rideById/:id", RideController.getRideById);
router.post("/ridesPerSearch", RideController.getRidesPerSearch);

/**
 * User API Routes
 */

 const UserController = require("../controllers/user.controller");

 router.get("/users", UserController.getAllUsers);
 router.get("/users/:id", UserController.getSingleUser);
 router.post("/New_User", UserController.NewUser);
 router.post("/Login", UserController.Login);
 router.patch("/users/:id", UserController.UpdateUser);
 router.get("/user/getCarByUser", UserController.getCarByUser);

module.exports = router;
