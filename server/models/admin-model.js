const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    // Linked user account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Full admin details
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // Admin access level
    roleLevel: {
      type: String,
      enum: ["super-admin", "admin", "moderator"],
      default: "admin",
    },

    // Permissions the admin has
    permissions: {
      manageCollectors: { type: Boolean, default: true },
      manageCentres: { type: Boolean, default: true },
      manageUsers: { type: Boolean, default: true },
      manageReports: { type: Boolean, default: true },
      managePickups: { type: Boolean, default: true },
      manageSettings: { type: Boolean, default: false },
    },

    // Admin activity logs
    lastLogin: { type: Date },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    profileImage: {
      publicId: String,
      url: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
