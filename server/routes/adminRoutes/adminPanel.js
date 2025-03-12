import express from "express";
import {
  createFeature,
  deleteFeature,
  getFeature,
  updateFeature,
} from "../../controllers/adminControllers/featureController.js";
import {
  createService,
  getService,
  updateService,
  deleteService,
} from "../../controllers/adminControllers/serviceController.js";

const router = express.Router();

//features routes
router.get("/features", getFeature);
router.post("/features/create", createFeature);
router.post("/features/update", updateFeature);
router.delete("/features/delete", deleteFeature);
//services routes
router.get("/services", getService);
router.post("/services/create", createService);
router.post("/services/update", updateService);
router.delete("/services/delete", deleteService);

export default router;
