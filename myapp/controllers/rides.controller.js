var { Ride } = require("../models/rides");
/**
 * Store a New Ride.
 */

const NewRide = async (req, res) => {
  try {
    var ride = new Ride({
      carId: req.body.carId,
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

/**
 * Get rides per search : destination + location
 */

const getRidesPerSearch = async (req, res) => {
  console.log("req.params.id_car", req.body.destination);
  console.log("req.params.id_car", req.body.departure);
  try {
    const RideList = await Ride.find({
      "Destination" : {'$regex' : req.body.destination, '$options' : 'i'},
      "Departure_Location" : {'$regex' : req.body.departure , '$options' : 'i'} });
    res.status(200).json({ message: "Operation Succeeded", RideList });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    }); 
    throw err;
  }
};

/**
 * Get ride details by ID
 */

const getRideById = async (req, res) => {
  console.log("id", req.params.id);
  try {
    const RideById = await Ride.find({
      "_id" : req.params.id});
      //populate('carId')
    res.status(200).json({ message: "Operation Succeeded", RideById });
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
  getRideById,
  getRidesPerSearch,
};
