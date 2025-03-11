import * as tf from "@tensorflow/tfjs";

let model;

const loadModel = async () => {
  try {
    model = await tf("utils/Cattle_CNN4.tflite");
    console.log("Model loaded successfully!");
  } catch (error) {
    console.error("Error loading model:", error);
  }
};

const getModel = () => model;
loadModel();

export default { loadModel, getModel };
