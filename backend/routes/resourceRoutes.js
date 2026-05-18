import express from "express";
import multer from "multer";

import {
  getResources,
  createResource,
  deleteResource,
  updateResource,
} from "../controllers/resourceController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getResources);

router.post("/", upload.single("file"), createResource);

router.delete("/:id", deleteResource);

router.put("/:id", updateResource);

export default router;