const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    mode: {
      type: String,
      enum: ["once", "daily"],
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "completed", "cancelled"],
      default: "pending",
      index: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number], //// [longitude, latitude]
        required: true,
      },
    },

    address: {
      type: String,
      required: true,
    },

    area: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },

    otp: {
      type: Number,
      default: Math.floor(Math.random() * 9000) + 1000,
    },

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

pickupRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("PickupRequest", pickupRequestSchema);
