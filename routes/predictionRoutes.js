import express from "express";
import multer from "multer";
import predictionController from "../controllers/predictController.js";

const router = express.Router();
const upload = multer(); // File upload middleware

router.post('/predict', upload.single("image"), predictionController.getPredictDisease);

export default predictionRoutes;
