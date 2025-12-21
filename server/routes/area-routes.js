const express = require("express");
const router = express.Router();
const {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
  findAreaByPoint,
  getAllAreasUnassignedCollectors,
  getAllAreasUnassignedCentres,
} = require("../controllers/area-controllers");
const { authorize } = require("../middlewares/auth-middleware");

router.post("/", authorize("admin"), createArea);

router.get("/", getAllAreas);

router.get("/point", findAreaByPoint);

router.get("/unassigned/collectors", getAllAreasUnassignedCollectors);

router.get("/unassigned/centres", getAllAreasUnassignedCentres);

router.get("/:id", getAreaById);

router.put("/:id", authorize("admin"), updateArea);

router.delete("/:id", authorize("admin"), deleteArea);

module.exports = router;
