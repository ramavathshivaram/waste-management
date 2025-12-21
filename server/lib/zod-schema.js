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
  area: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

//! CENTRE SCHEMA
const create_centre_schema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().optional(),
  maxCapacity: z.number().min(1).max(1000).optional(),
  coordinates: z.array(z.number()).length(2),
  area: z.object({
    id: z.string(),
    name: z.string(),
  }),
  operatingHours: z
    .object({
      open: z.string(),
      close: z.string(),
    })
    .optional(),
});

//! PICKUP SCHEMA

const create_pickup_schema = z.object({
  coordinates: z.array(z.number()).length(2),
  mode: z.enum(["once", "daily"]),
  address: z.string().min(10).max(500),
});

//! ADMIN SCHEMA

const admin_approve_schema = z.object({
  status: z.enum(["active", "inactive", "rejected"]),
  areaId: z.string(),
  label: z.string(),
});

//! ILLEGAL DUMP SCHEMA

//! AREA SCHEMA
const create_area_schema = z.object({
  name: z.string().min(1).max(100),
  description: z.string(),
  area: z.object({
    type: z.literal("Polygon"),
    coordinates: z.array(z.array(z.array(z.number()))),
  }),
});

module.exports = {
  register_schema,
  login_schema,

  update_collector_schema,
  create_collector_schema,

  create_pickup_schema,

  create_centre_schema,

  admin_approve_schema,

  create_area_schema,
};
