const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  logout,
} = require("../controllers/auth-controllers");
const { protect } = require("../middlewares/auth-middleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post("/logout", protect, logout);

module.exports = router;
