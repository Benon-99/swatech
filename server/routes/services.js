import express from "express";
import {
  createServiceController,
  updateServiceController,
  deleteServiceController,
  getServiceController,
  getAllServicesController,
  getServiceByIdController,
  getServicesByCategoryController,
} from "../controllers/servicesController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`Services Route - ${req.method} ${req.originalUrl}`);
  next();
});

// Public routes
router.get("/", getAllServicesController);
router.get("/service/:name", getServiceController);
router.get("/id/:id", getServiceByIdController);
router.get("/category/:categoryId", getServicesByCategoryController);

// Protected routes
// router.post("/", authenticateToken, createServiceController);
router.post("/", createServiceController);
// router.put("/service/:id", authenticateToken, updateServiceController);
router.put("/service/:id", updateServiceController);
// router.delete("/service/:id", authenticateToken, deleteServiceController);
router.delete("/service/:id", deleteServiceController);

export default router;
