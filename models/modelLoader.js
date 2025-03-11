const tf = require("@tensorflow/tfjs");
const tflite = require("@tensorflow/tfjs-tflite"); // Import TensorFlow Lite for JavaScript

let model;

const loadModel = async () => {
  try {
    model = await tflite.loadTFLiteModel("utils/Cattle_CNN4.tflite"); // ✅ Corrected
    console.log("Model loaded successfully!");
  } catch (error) {
    console.error("Error loading model:", error);
  }
};

const getModel = () => model;  // ✅ Correctly exported

module.exports = { loadModel, getModel };  // ✅ CommonJS Export
