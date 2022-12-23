const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RideSchema = new Schema(
  {
    carId: {type: Schema.Types.ObjectId, ref: "Car"},
    Destination: { type: String, require: true },
    Departure_Location: { type: String, require: true},
    Departure_Date: { type: String, require: true },
    Departure_Time: { type: String, require: true },
    Ride_Fees: { type: Number, require: true },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Rides", RideSchema);
module.exports = { Ride };