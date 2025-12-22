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

    pickups: {
      receivedPickups: [
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
      rejected: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pickup",
        },
      ],
    },
    totals: {
      received: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      completed: { type: Number, default: 0 },
      rejected: { type: Number, default: 0 },
    },
  },

  { timestamps: true }
);

centreDailyStatsSchema.pre("save", function (next) {
  this.totals.received = this.pickups.received.length;
  this.totals.pending = this.pickups.pending.length;
  this.totals.completed = this.pickups.completed.length;
  this.totals.rejected = this.pickups.rejected.length;
  next();
});

centreDailyStatsSchema.index({ centreId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("CentreDailyStats", centreDailyStatsSchema);
