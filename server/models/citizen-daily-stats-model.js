const mongoose = require("mongoose");

const citizenDailyStatsSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
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

    pickups: {
      completedPickups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PickupRequest",
        },
      ],

      missedPickups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PickupRequest",
        },
      ],

      cancelledPickups: [
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

      totalPickups: {
        type: Number,
        default: 0,
      },
    },

    illegalDumps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "IllegalDump",
      },
    ],
  },
  { timestamps: true }
);

citizenDailyStatsSchema.index({ citizenId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("CitizenDailyStats", citizenDailyStatsSchema);
