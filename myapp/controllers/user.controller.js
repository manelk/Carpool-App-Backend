var { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const JWT_KEY = process.env.JWT_KEY;
/**
 * Get all Users.
 */

const getAllUsers = async (req, res) => {
  try {
    const UsersList = await User.find();
    res.status(200).json({ message: "Operation Succeeded", UsersList });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found.",
    });
    throw err;
  }
};

/**
 * Get a Single User.
 */

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({ message: "Operation Succeeded", user });
  } catch (err) {
    res.status(404).json({
      message: "No Data Found with this Id.",
    });
    throw err;
  }
};

/**
 * Store a New User.
 */

const NewUser = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  const HashPassword = await bcrypt.hash(req.body.password, 15);

  if (user.length >= 1) {
    res.status(409).json({ Message: "This e-mail address already exists'." });
    return;
  }

  if (user.length == 0) {
    try {
      let user1 = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobilePhone: req.body.mobilePhone,
        email: req.body.email,
        car: req.body.car,
        password: HashPassword,
      });
      const newUser = await user1.save();
      res.status(201).json({ message: "Operation Succeeded", newUser });
    } catch (err) {
      res.status(500);
      throw err;
    }
  }
};
/**
 * Update an existing User.
 */

const UpdateUser = async (req, res) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { $set: updateOps }
    );
    res.status(200).json({ message: "Operation Succeeded", updateUser });
  } catch (err) {
    res.status(304).json({ message: "Operation to Update Failed." });
    throw err;
  }
};


const Login = async (req, res) => {
  try {
    const Email = req.body.email;
    const Password = req.body.password;
    const user = await User.findOne({ email: Email });
console.log("user", user)
    if (!user) {
      res.status(409).json({ Message: "Email address doesn't exist." });
      return;
    }

    const isEqual = await bcrypt.compare(Password, user.password);

    if (!isEqual) {
      res.status(409).json({ Message: "Password incorrect." });
      return;
    }

    const token = jwt.sign(
      {
        UserId: user._id,
        Email: user.email,
        FirstName: user.firstName,
        LastName: user.lastName,
      },
      `${JWT_KEY}`,
      { expiresIn: "3h" }
    );

    const SecretInfo = {
      UserId: user._id,
      FirstName: user.firstName,
      LastName: user.lastName,
      Profile: user.profile,
      Email: user.email,
      Phone: user.phone,
      Address: user.adresse,
      token: token,
      tokenExpiration: 3,
    };

    res.status(200).json({ message: "Login Successful", SecretInfo });
  } catch (err) {
    res.status(500);
    throw err;
  }
};

const getCarByUser = async (req, res) => {
    try {
      const CarByUser = await User.find().populate("car");
      res.status(200).json({ message: "Operation Succeeded", CarByUser });
    } catch (err) {
      res.status(404).json({
        message: "No Data Found.",
      });
      throw err;
    }
  };
module.exports = {
  getAllUsers,
  getSingleUser,
  NewUser,
  UpdateUser,
  Login,
  getCarByUser,
};
