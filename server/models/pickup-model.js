const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    wasteType: {
      type: String,
      enum: ["plastic", "organic", "e-waste", "metal", "paper", "mixed"],
      required: true,
    },

    quantity: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    scheduledDateTime: {
      type: Date,
      required: true,
    },

    // ⭐ Cloudinary images support
    images: [
      {
        publicId: String,
        url: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "in-progress",
        "picked",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    assignedCollectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PickupRequest", pickupRequestSchema);
