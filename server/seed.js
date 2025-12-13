const mongoose = require("mongoose");
const PickupRequest = require("./models/pickup-model"); // adjust path
require("dotenv").config();
const Centre = require("./models/centre-model");
const centres = require("./lib/data");

/* ------------------ CONFIG ------------------ */

const MONGO_URI = process.env.MONGO_URI;

// 🔁 Use an existing citizenId from your DB
const CITIZEN_ID = new mongoose.Types.ObjectId(
  "64f000000000000000000001" // 👈 replace with real User _id
);

const wasteTypes = ["plastic", "organic", "e-waste", "metal", "paper", "mixed"];
const statuses = [
  "pending",
  "assigned",
  "in-progress",
  "picked",
  "completed",
  "cancelled",
];

const quantities = ["1kg", "2kg", "5kg", "10kg"];

/* ------------------ HELPERS ------------------ */

// Random date ± 7 days
const randomDate = () => {
  const now = new Date();
  const days = Math.floor(Math.random() * 14) - 7;
  return new Date(now.setDate(now.getDate() + days));
};

// Random Hyderabad-like coordinates
const randomCoordinates = () => {
  const lat = 17.385 + (Math.random() - 0.5) * 0.1;
  const lng = 78.4867 + (Math.random() - 0.5) * 0.1;
  return [lng, lat]; // GeoJSON → [lng, lat]
};

/* ------------------ SEED FUNCTION ------------------ */

// const seedPickups = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("MongoDB connected");

//     const pickups = Array.from({ length: 50 }).map(() => ({
//       citizenId: CITIZEN_ID,

//       wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],

//       quantity: quantities[Math.floor(Math.random() * quantities.length)],

//       address: `House No ${Math.floor(Math.random() * 100)}, Road ${Math.floor(
//         Math.random() * 20
//       )}, Hyderabad`,

//       scheduledDateTime: randomDate(),

//       mode: Math.random() > 0.8 ? "daily" : "once",

//       status: statuses[Math.floor(Math.random() * statuses.length)],

//       isCompleted: Math.random() > 0.7,

//       otp: Math.floor(1000 + Math.random() * 9000),

//       desc: "Dummy pickup request for testing",

//       images: [
//         {
//           publicId: "dummy/pickup",
//           url: "https://via.placeholder.com/300",
//         },
//       ],

//       location: {
//         type: "Point",
//         coordinates: randomCoordinates(),
//       },
//     }));

//     await PickupRequest.insertMany(pickups);
//     console.log("✅ 50 Pickup Requests inserted successfully");

//     process.exit();
//   } catch (error) {
//     console.error("❌ Error seeding pickups:", error);
//     process.exit(1);
//   }
// };

const seedPickups = async () => {
  await Centre.insertMany(centres);
  console.log("done");
};

seedPickups();
