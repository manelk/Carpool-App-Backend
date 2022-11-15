var { Car } = require("../models/car");

const request = require("request");

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
    const newCar = await car.save();
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
        res
          .status(200)
          .json({
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



module.exports = {
  NewCar,
  allCarsMakers,
  getAllCars,
  getManufacturer,
};
