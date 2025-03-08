const DiseaseInformation = require('../models/DiseaseInformationModel');


exports.updateDiseaseInformations = async (req, res, next) => {
    try {
        const Name = req.body.diseaseName;

        const diseaseFound = await DiseaseInformation.findOne({ diseaseName: Name });

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

exports.getDiseaseInfo=async(req,res,next)=>{
    try {

        const disease=req.body.diseaseName;

        if(!disease){
            return res.status(403).json({
                status:'fail',
                message:'Kindly enter the Disease Name'
            })
        }

        const diseaseInfo=await DiseaseInformation.findOne({diseaseName:disease});
        if(!diseaseInfo){
            return res.status(403).json({
                status:'fail',
                message:'The Disease Information is Not Found!'
            })
        }

        return res.status(200).json({
            status:'Success',
            message:`${disease} disease Information is Successfully received !`,
            diseaseInfo
        })
        
    } catch (error) {

        return res.status(500).json({
            status:'fail',
            message:error.message
        })
        
    }
}