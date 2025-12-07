const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const Centre = require("../models/centre-model");
const Collector = require("../models/collector-model");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address, location, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please add all fields" });
    }
    if (role && role === "admin") {
      return res.status(400).json({ message: "Admin role is reserved" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "citizen",
      address,
      location,
      phone,
    });

    if (user.role === "collector") {
      await Collector.create({ userId: user._id });
    } else if (user.role === "centre") {
      await Centre.create({ userId: user._id });
    }

    if (user) {
      res.cookie("token", generateToken(user._id), {
        httpOnly: true,
        secure: false,
        sameSite: "lax", //// localhost
        maxAge: 24 * 60 * 60 * 1000, //// 1 day
      });

      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    throw new Error();
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.cookie("token", generateToken(user._id), {
        httpOnly: true,
        secure: false,
        sameSite: "lax", //// localhost
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    throw new Error();
  }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      rewardPoints: user.rewardPoints,
    });
  } catch (error) {
    throw new Error();
  }
};

//@decs Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    res.status(200).json({ message: "Logout success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logout,
};
