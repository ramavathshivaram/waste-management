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
          ref: "Pickup",
        },
      ],
      pendingPickups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pickup",
        },
      ],
      assinedPickups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pickup",
        },
      ],
      missedPickups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pickup",
        },
      ],
    },
    totals: {
      completed: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      assined: { type: Number, default: 0 },
      missed: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

collectorDailyStatsSchema.pre("save", function (next) {
  this.totals.completed = this.pickups.completedPickups.length;
  this.totals.pending = this.pickups.pendingPickups.length;
  this.totals.completed = this.pickups.completedPickups.length;
  this.totals.missed = this.pickups.missedPickups.length;
  next();
});

collectorDailyStatsSchema.index({ collectorId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model(
  "CollectorDailyStats",
  collectorDailyStatsSchema
);
