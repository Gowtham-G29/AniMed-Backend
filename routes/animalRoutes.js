const express = require('express');
const authController = require('../controllers/authController');
const animalController = require('../controllers/animalController');

const animalRouter = express.Router();


animalRouter.post('/animalDetailsRegister', authController.protect, animalController.animalDetailsRegister);
animalRouter.get('/getAnimals', authController.protect, animalController.getAnimalDetails);
animalRouter.delete('/deleteAnimal', animalController.deleteAnimal);
animalRouter.patch('/updateAnimal', animalController.updateAnimal);

//for doctor side

animalRouter.patch('/updateDoctorSuggestions',animalController.updateDoctorSuggetions);

module.exports = animalRouter;