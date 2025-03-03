import express from "express";
import multer from "multer";
import { predictDisease } from "../controllers/predictController.js";

const router = express.Router();
const upload = multer(); // File upload middleware

router.post('/predict', upload.single("image"), predictDisease);

export default predictionRoutes;
