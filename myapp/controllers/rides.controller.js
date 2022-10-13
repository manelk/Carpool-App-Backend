var { Ride } = require("../models/rides");
/**
 * Store a New Ride.
 */

const NewRide = async (req, res) => {
  try {
    var ride = new Ride({
      Destination: req.body.Destination,
      Departure_Location: req.body.Departure_Location,
      Departure_Date: req.body.Departure_Date,
      Departure_Time: req.body.Departure_Time,
      Ride_Fees: req.body.Ride_Fees,
    });
    const newRide = await ride.save();
    res.status(201).json({ message: "Operation Succeeded", newRide });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Get all rides
 */

const getAllRides = async (req, res) => {
  try {
    const RideList = await Ride.find();
    res.status(200).json({ message: "Operation Succeeded", RideList });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

module.exports = {
  NewRide,
  getAllRides,
};
