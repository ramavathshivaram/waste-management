const { z } = require("zod");

const register_schema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email().min(1).max(50),
  password: z.string().min(8).max(50),
  role: z.enum(["citizen", "collector", "centre"]),
});

const login_schema = z.object({
  email: z.string().email().min(1).max(50),
  password: z.string().min(8).max(50),
});

const update_collector_schema = z.object({
  licenseNumber: z.string().min(8).max(50).optional(),
  vechileNumber: z.string().min(8).max(50).optional(),
  isAdminVerified: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  status: z.enum(["active", "inactive", "busy"]).optional(),
});
const create_collector_schema = z.object({
  licenseNumber: z.string().min(8).max(50),
  vehicleNumber: z.string().min(8).max(50),
  desc: z.string().optional(),
});

module.exports = {
  register_schema,
  login_schema,
  update_collector_schema,
  create_collector_schema,
};
