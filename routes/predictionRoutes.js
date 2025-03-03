import express from "express";
import multer from "multer";
const predictionController = require('../controllers/predictController');



const router = express.Router();
const upload = multer(); // File upload middleware

router.post('/predict', upload.single("image"), predictionController.getPredictDisease);

module.exports = predictionRouter;
