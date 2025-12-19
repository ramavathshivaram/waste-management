const express = require("express");
const router = express.Router();
const {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
} = require("../controllers/area-controllers");

router.post("/", createArea);

router.get("/", getAllAreas);

router.get("/:id", getAreaById);

router.put("/:id", updateArea);

router.delete("/:id", deleteArea);
