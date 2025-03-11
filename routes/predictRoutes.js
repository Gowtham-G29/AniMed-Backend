import express from "express";
import multer from "multer";
import { predictDisease } from "../controllers/predictController.js";  // ✅ Correct ESM import

const predictRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

predictRouter.post("/predict", upload.single("image"), predictDisease);

module.exports= predictRouter; // ✅ Correct ES Module export
