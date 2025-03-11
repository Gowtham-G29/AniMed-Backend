import { loadLayersModel } from "@tensorflow/tfjs-node";

let model;

const loadModel = async () => {
  try {
    model = await loadLayersModel("utils/Cattle_CNN4.tflite");
    console.log("Model loaded successfully!");
  } catch (error) {
    console.error("Error loading model:", error);
  }
};

const getModel = () => model;

export default { loadModel, getModel };
