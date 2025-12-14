const { z } = require("zod");

//! AUTH SCHEMA
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

//! COLLECTOR SCHEMA

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
  coordinates: z.array(z.number()).length(2),
});

//! CENTRE SCHEMA
const create_centre_schema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().optional(),
  maxCapacity: z.number().min(1).max(1000).optional(),
  coordinates: z.array(z.number()).length(2),
  operatingHours: z
    .object({
      open: z.string(),
      close: z.string(),
    })
    .optional(),
});

//! PICKUP SCHEMA

//! ADMIN SCHEMA

//! ILLEGAL DUMP SCHEMA

module.exports = {
  register_schema,
  login_schema,

  update_collector_schema,
  create_collector_schema,

  create_centre_schema,
};
