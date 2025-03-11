import express from "express";
import multer from "multer";
import { predictDisease } from "../controllers/predictController.js";  // ✅ Correct ESM import

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/predict", upload.single("image"), predictDisease);

export default predictRoutes; // ✅ Correct ES Module export
