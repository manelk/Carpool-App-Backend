const express = require('express');
const { mongoose } = require("./database/database");
const app = express();
const Routes = require("./routes/routes");
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;

var cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With , Content-Type , Accept , Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT ,POST, PATCH , DELETE");
    res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Accept", "application/json");
    return res.status(200).json({});
  }
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/Api", Routes);

app.get("/", (req, res) => {
    res.send("<center> Back end Project Server is Running. </center>");
  });
  const Server = app.listen(PORT, () => {
    console.log(`The Express Server is Running on Port :  ${PORT}`);
  });

module.exports = Server;