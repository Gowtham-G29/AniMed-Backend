const diseaseInformation=require('../models/DiseaseInformationModel');


exports.updateDiseaseInformations=async(req,res,next)=>{
    try{
        const Name=req.body.diseaseName;
        
        const diseaseFound=await diseaseInformation.findOne({diseaseName:Name});

        if(!diseaseFound){
            res.status(200).json({
                status:'success',
                message:'Disease is new you can update it.',
                diseaseFound
            })
        }

    }catch(error){
        res.status(500).json({
            status:'fail',
            message:error.message
        })
    }
}