const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, dob, password, email, phoneNo } = req.body;

    if (!firstName || !lastName || !dob || !password || !email || !phoneNo) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const userPresent = await User.findOne({ email });

    if (userPresent) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash the password:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      phoneNo,
    });

    if (userData) {
      res.status(200);
      res.json({ data: userData });
    } else {
      res.status(400);
      throw new Error("Invalid user data.");
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200);
      res.json({
        userId: user._id,
        token: generateToken(user._id),
        userName: user.firstName + user.lastName,
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.json({ message: err.message, stack: err.stack });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await User.findById(userId).select("-password");

    if (userData) {
      res.status(200);
      res.json({ userData: userData });
    } else {
      throw new Error("User doesn't exists");
    }
  } catch (err) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) throw new Error("User doesn't exists.");

    const updatedUserData = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.json({
      data: updatedUserData,
    });
  } catch (err) {
    res.status(400);
    res.json({ errorMsg: err.message });
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
};
