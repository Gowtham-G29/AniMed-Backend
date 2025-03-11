import * as tf from "@tensorflow/tfjs";
const { getModel } = require("../models/modelLoader");  

const processImage = async (buffer) => {
    const tensor = tf
        .decodeImage(buffer)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(255.0);
    return tensor;
};

export async function predictDisease(req, res) {
    const model = getModel();
    if (!model) return res.status(500).json({ error: "Model not loaded yet" });

    try {
        const imageTensor = await processImage(req.file.buffer);
        const prediction = model.predict(imageTensor);
        const scores = await prediction.array();

        const diseases = ["Lumpy Skin Disease", "Ringworm", "Mange", "Foot-and-Mouth"];
        const predictedDisease = diseases[scores[0].indexOf(Math.max(...scores[0]))];

        res.json({
            prediction:
                predictedDisease
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
