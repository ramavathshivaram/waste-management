const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const Centre = require("../models/centre-model");
const Collector = require("../models/collector-model");

const { register_schema, login_schema } = require("../lib/zod-schema");

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//// helper function to send token in cookie and response
const sendToken = (res, user, statusCode = 200) => {
  const token = generateToken({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isSubmitted: user.isSubmitted,
  });
};

const registerUser = async (req, res) => {
  try {
    const parsed = register_schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.errors[0].message,
      });
    }

    const { name, email, password, role } = parsed.data;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "citizen",
    });

    sendToken(res, user, 201);
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const parsed = login_schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.errors[0].message,
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      sendToken(res, user);
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    throw new Error();
  }
};

const getMe = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    throw new Error();
  }
};

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
