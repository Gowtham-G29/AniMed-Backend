const diseaseInformation = require('../models/DiseaseInformationModel');


exports.updateDiseaseInformations = async (req, res, next) => {
    try {
        const Name = req.body.diseaseName;

        const diseaseFound = await diseaseInformation.findOne({ diseaseName: Name });

        if (diseaseFound) {
            return res.status(404).json({
                status: 'fail',
                message: 'Try for another disease',
            })
        }

        const data = { ...req.body };
        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'No data is provided'
            })
        };

        const updatedInformation = await diseaseInformation.create(req.body);

        return res.status(201).json({
            status: 'Success',
            message: `The information for the ${data.diseaseName} disease is created Successfully`,
            updatedInformation
        })


    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}