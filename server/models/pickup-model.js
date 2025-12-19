const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    scheduledDateTime: {
      type: Date,
      default: null,
    },

    isDaily: {
      type: Boolean,
      default: false,
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

    otp: {
      type: Number,
      default: Math.floor(Math.random() * 9000) + 1000,
    },

    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

pickupRequestSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("PickupRequest", pickupRequestSchema);
