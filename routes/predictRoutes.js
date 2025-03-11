const express = require("express");
const multer = require("multer");
const { predictDisease } = require("../controllers/predictController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/predict", upload.single("image"), predictDisease);

module.exports = router;  // ✅ Correct CommonJS export
