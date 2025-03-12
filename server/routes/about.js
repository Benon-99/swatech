import express from "express";
import upload from "../upload.js";
import {
  getAboutUs,
  updateAboutUs,
  deleteAboutUs,
  createAboutUs,
  getHome,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAboutUs);
router.post("/update", upload.single("img"), updateAboutUs);
router.post("/delete", deleteAboutUs);
router.post("/create", upload.single("img"), createAboutUs);

export default router;