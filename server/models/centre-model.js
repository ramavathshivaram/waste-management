const mongoose = require("mongoose");

const centreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Centre name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Full address
    address: {
      type: String,
      required: true,
    },

    // Contact number
    phone: {
      type: String,
      required: true,
    },

    // Admin verifies centre
    isAdminVerified: {
      type: Boolean,
      default: false,
    },

    // Waste types handled
    acceptedWasteTypes: [
      {
        type: String,
        enum: ["plastic", "organic", "e-waste", "metal", "paper", "mixed"],
      },
    ],

    // Cloudinary Image for Centre
    image: {
      publicId: { type: String },
      url: { type: String },
    },

    // Centre capacity tracking
    capacity: {
      current: {
        type: Number,
        default: 0, // in kg or tons based on your system
      },
      max: {
        type: Number,
        default: 200, // example default capacity
      },
    },

    // Optional geo-location
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },

    // Operating hours
    operatingHours: {
      open: { type: String }, // e.g. "09:00"
      close: { type: String }, // e.g. "18:00"
    },

    // Status of centre
    status: {
      type: String,
      enum: ["active", "inactive", "full"],
      default: "inactive",
    },

    // Description or additional info
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Centre", centreSchema);