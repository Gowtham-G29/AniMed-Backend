const express = require('express');
const diseaseInformationController=require('../controllers/diseaseInformationController');

const diseaseInformationRouter=express.Router();

diseaseInformationRouter.post('/updateDiseaseInformation',diseaseInformationController.updateDiseaseInformations);


module.exports=diseaseInformationRouter;