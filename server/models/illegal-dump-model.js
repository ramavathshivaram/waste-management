// models/illegal-dump-model.js
const mongoose = require("mongoose");

const illegalDumpSchema = new mongoose.Schema(
  {
    // Who reported it (Citizen)
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic location text
    locationText: {
      type: String,
      required: true, // e.g. "Near canal, Kanuuru main road"
      trim: true,
    },

    // Optional structured address
    address: {
      type: String,
    },

    // Optional coordinates if you add maps later
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },

    // Description by user
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Photos via Cloudinary
    images: [
      {
        publicId: String, // for deleting from Cloudinary
        url: String, // secure_url to display
      },
    ],

    // Status for admin/collector workflow
    status: {
      type: String,
      enum: ["new", "in-review", "assigned", "resolved", "dismissed"],
      default: "new",
    },

    // Admin / municipal notes
    adminNotes: {
      type: String,
      default: "",
    },

    // If assigned to a collector
    assignedCollectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Optional severity tag
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("IllegalDump", illegalDumpSchema);
