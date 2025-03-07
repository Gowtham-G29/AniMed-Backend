const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
    diseaseName: {
        type: String,
        required: true,
        default: "Not yet Updated",
        unique:true
    },
    scientificName: {
        type: String,
        default: "Not yet Updated"
    },
    speciesAffected: {
        type: String,        
        default:"Not yet Updated"
    },
    zoonoticPotential: {
        type: String,
        enum: ["Yes", "No"],
        default:"Not yet Updated"
    },
    causativeAgent: {
        type: String,
        default:"Not yet Updated"
    },
    transmission: {
        type: String,
        default:"Not yet Updated"
    },
    predisposingFactors: {
        type: String,
        default:"Not yet Updated"
    },
    symptoms: {
        type: String,
        default:"Not yet Updated"
    },
    behaviorChanges: {
        type: String,
        default:"Not yet Updated"
    },
    duration: {
        type: String,
        default:"Not yet Updated"
    },
    diagnosisMethods: {
        type: String,
        default:"Not yet Updated"
    },
    preventionStrategies: {
        type: String,
        default:"Not yet Updated"
    },
    firstAid: {
        type: String,
        default:"Not yet Updated"
    },
    medications: {
        type: String,
        default:"Not yet Updated"
    },
    monitoring: {
        type: String,
        default:"Not yet Updated"
    },
}, { timestamps: true });

const DiseaseInformation = mongoose.model("Disease", diseaseSchema);

module.exports = DiseaseInformation;
