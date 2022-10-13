const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });


const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;

mongoose
  .connect(
    `mongodb+srv://admin:${MONGO_PASSWORD}@cluster0.vqksml1.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connection To Carpool DataBase Succeeded");
  })
  .catch((err) => {
    console.log("Error in Carpool DataBase Connection : " + err);
  });

module.exports = mongoose;