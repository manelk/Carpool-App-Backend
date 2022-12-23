var { Car } = require("../models/car");

const request = require("request");
const { User } = require("../models/user");

const allCarsMakers = async (req, res) => {
  request(
    "https://private-anon-a2971b263d-carsapi1.apiary-mock.com/cars",
    function (error, response, body) {
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", JSON.parse(body));
      res
        .status(201)
        .send({ message: "Operation Succeeded", body: JSON.parse(body) });
    }
  );
};

/*
var model = 'camry'
request.get({
  url: 'https://api.api-ninjas.com/v1/cars?model=' + model,
  headers: {
    'X-Api-Key': 'mRcFAhyElZXwSU0lsOBFpA==U9JBL0CgNboOSzRJ'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});*/
/**
 * Store a New Car.
 */

const NewCar = async (req, res) => {
  try {
    var car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      color: req.body.color,
      energy_type: req.body.energy_type,
    });
    await User.findByIdAndUpdate(
      '6352bf5005eee65be09a7bda', {car:"6399929dacfaa1709d371ba4"}
      );
    const newCar =  car.save();
    res.status(201).json({ message: "Operation Succeeded", newCar });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

/**
 * Get all cars registered in the system
 */
const getAllCars = async (req, res) => {
  try {
    const CarList = await Car.find();
    res.status(200).json({ message: "Operation Succeeded", CarList });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get car by ID registered in the system
 */
const getCarById = async (req, res) => {
  const id_car = req.params.id_car;
  try {
    const CarOne = await Car.findOne({ _id: id_car });
    res.status(200).json({ message: "Operation Succeeded", CarOne });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get list of Manufacturer
 */
const getManufacturer = async (req, res) => {
  let CarManufacturerList = [];
  try {
    request(
      "https://private-f177f3-carsapi1.apiary-mock.com/manufacturers",
      function (error, response, body) {
        const reformattedArray = JSON.parse(body);
        reformattedArray.map(function (e) {
          CarManufacturerList.push(e.name);
        });
        res.status(200).json({
          message: "Operation Succeeded",
          CarManufacturerList: CarManufacturerList,
        });
      }
    );
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get User Car Information
 */

const getCarInformation = async (req, res) => {
  try {
    const CarList = await Car.find();
    res.status(200).json({ message: "Operation Succeeded", CarList });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Edit Car Information
 */

const editCarInformation = async (req, res) => {
  console.log("req.params.id_car", req.body.brand);
  try {
    var newCarInformation = {
      brand: req.body.brand,
      model: req.body.model,
      color: req.body.color,
      energy_type: req.body.energy_type,
    };

    const updateCar = await Car.findByIdAndUpdate(
      { _id: req.params.id_car },
      { $set: newCarInformation },
      { new: true }
    );
    res.status(200).json({ message: "Operation Succeeded", updateCar });
    console.log("updateCar", updateCar);
  } catch (err) {
    res.status(304).json({ message: "Operation to Update Failed." });
    throw err;
  }
};

/**
 * Delete Car Information
 */

const deleteCarInformation = async (req, res) => {
  const id_car = req.params.id_car;
  //const id_car = req.body.id_car;
  console.log("id_car", id_car);
  try {
    const deleteCar = await Car.findByIdAndRemove(id_car);
    res.status(200).json({ message: "Operation Succeeded", deleteCar });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

module.exports = {
  NewCar,
  allCarsMakers,
  getAllCars,
  getManufacturer,
  editCarInformation,
  deleteCarInformation,
  getCarById,
};
