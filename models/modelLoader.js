import * as tf from "@tensorflow/tfjs";
import * as tflite from "@tensorflow/tfjs-tflite"; // Import TensorFlow Lite for JavaScript

let model;

export const loadModel = async () => {
  try {
    model = await tflite.loadTFLiteModel("utils/Cattle_CNN4.tflite"); // ✅ Corrected
    console.log("Model loaded successfully!");
  } catch (error) {
    console.error("Error loading model:", error);
  }
};

export const getModel = () => model;  // ✅ Correctly exported
