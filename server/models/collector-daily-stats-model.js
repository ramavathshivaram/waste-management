const mongoose = require("mongoose");

const collectorDailyStatsSchema = new mongoose.Schema(
  {
    collectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collector",
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
      default: 0, // optional
    },

    workingMinutes: {
      type: Number,
      default: 0,
    },

    assignedPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupRequest",
      },
    ],

    completedPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupRequest",
      },
    ],

    pendingPickups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PickupRequest",
      },
    ],
  },
  { timestamps: true }
);

collectorDailyStatsSchema.index({ collectorId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model(
  "CollectorDailyStats",
  collectorDailyStatsSchema
);
