const tf = require("@tensorflow/tfjs");
const { getModel } = require("../models/modelLoader"); // ✅ Use require() for CommonJS

const processImage = async (buffer) => {
    const tensor = tf.node.decodeImage(buffer)  // ✅ Use tf.node for decoding images
        .resizeBilinear([224, 224])  // ✅ Resize to 224x224
        .expandDims(0)  // ✅ Add batch dimension
        .toFloat()
        .div(tf.scalar(255.0));  // ✅ Normalize

    return tensor;
};

exports.predictDisease = async (req, res,next) => {  // ✅ Use `exports.predicts`
    const model = getModel();
    if (!model) return res.status(500).json({ error: "Model not loaded yet" });

    try {
        const imageTensor = await processImage(req.file.buffer);
        const prediction = model.predict(imageTensor);
        const scores = await prediction.array();

        const diseases = ["Lumpy Skin Disease", "Ringworm", "Mange", "Foot-and-Mouth"];
        const predictedDisease = diseases[scores[0].indexOf(Math.max(...scores[0]))];

        res.json({ prediction: predictedDisease });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
