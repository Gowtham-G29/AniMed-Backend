const express = require('express');
const diseaseInformationController=require('../controllers/diseaseInformationController');

const diseaseInformationRouter=express.Router();

diseaseInformationRouter.get('/diseaseInformation',diseaseInformationController.updateDiseaseInformations);


module.exports=diseaseInformationRouter;