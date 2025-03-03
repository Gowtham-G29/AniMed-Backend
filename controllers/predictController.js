import * as tflite from "@tensorflow/tfjs-tflite";
import * as tf from "@tensorflow/tfjs";
import sharp from "sharp";
import path from "path";


let model;

// Load the TFLite model once at startup
export async function loadModel() {
    const modelPath = `file://${path.resolve("utils/Cattle_CNN4.tflite")}`;
    model = await tflite.loadTFLiteModel(modelPath);
    console.log("✅ TFLite Model Loaded Successfully");
}

// Get the loaded model
export function getModel() {
    if (!model) throw new Error("Model not loaded yet");
    return model;
}

export const getPredictDisease = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No image uploaded"
        });
    }

    try {
        // Convert image to RGB Tensor
        const imageBuffer = await sharp(req.file.buffer)
            .resize(224, 224)
            .toFormat("png")
            .toBuffer();

        const imageTensor = tf.node.decodeImage(imageBuffer).expandDims(); // Add batch dimension

        const output = getModel().predict(imageTensor);
        const prediction = output.dataSync(); // Get output as an array

        res.json({ prediction });

    } catch (error) {
        console.error("Error during prediction:", error);
        res.status(500).json({ error: "Failed to process image" });
    }
}




module.exports = { getPredictDisease };

