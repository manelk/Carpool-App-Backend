const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * Brand model and color becomes IDs that point to the collections created.
 */
const CarSchema = new Schema(
  {
    brand: { type: String, require: true },
    model: { type: String, require: true},
    color: { type: String, require: true },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);
module.exports = { Car };
