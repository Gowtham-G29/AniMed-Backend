const express=require('express');
const authController=require('../controllers/authController');
const animalController=require('../controllers/animalController');

const animalRouter=express.Router();


animalRouter.post('/animalDetailsRegister',authController.protect,animalController.animalDetailsRegister);


module.exports=animalRouter;