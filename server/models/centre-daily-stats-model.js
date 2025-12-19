const mongoose = require("mongoose");

const centreDailyStatsSchema = new mongoose.Schema(
  {
    centreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Centre",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    totalWasteKg: {
      type: Number,
      default: 0,
    },

    totalDistanceKm: {
      type: Number,
      default: 0,
    },

    workingMinutes: {
      type: Number,
      default: 0,
    },
    receivedPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pickup",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("CentreDailyStats", centreDailyStatsSchema);
