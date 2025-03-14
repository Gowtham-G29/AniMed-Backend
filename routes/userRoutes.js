const express=require('express');
const userController=require('../controllers/userController');
const authController=require('../controllers/authController');
const animalController=require('../controllers/animalController');
const userRouter=express.Router();


userRouter.post('/signup',authController.signUp);
userRouter.post('/login',authController.login);


userRouter.post('/forgotPassword',authController.forgotPassword);
userRouter.patch('/resetPassword/:token',authController.resetPassword);

userRouter.patch('/updateCurrentUserPassword',authController.protect,authController.updateCurrentUserPassword);
userRouter.patch('/updateMe',authController.protect,userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateMe);

userRouter.patch('/deleteMe',authController.protect,userController.deleteMe);
userRouter.post('/logout',authController.clearCookieLogout);

userRouter.get('/getMe',authController.protect,userController.getUserDetails);

userRouter.post('/userDetailsRegister',authController.protect,authController.userDetailsRegister);
userRouter.post('/vetDoctorDetailsRegister',authController.protect,authController.vetDoctorDetailsRegister);


userRouter.get('/getAnimalOwner',authController.protect,userController.getAnimalOwnerDetails);

userRouter.get('/getNearByDoctors', userController.getNearbyDoctorsLocation);

//for doctors
userRouter.get('/getNearbyAnimals',authController.protect,animalController.getNearbyAnimals);
userRouter.get('/getDoctorDetails',authController.protect,userController.getDoctorDetails);
userRouter.get('/getAnimalOwnerContacts',userController.getAnimalOwnerContacts);
userRouter.get('/getVetDoctorDetails',authController.protect,userController.getVetDoctorDetails);

//autologin


userRouter.get('/autoLogin',authController.autoLogin);
userRouter.get('/getUserState',authController.getUserState);


//Approval
userRouter.get('/approveDoctors',userController.approveDoctors);
userRouter.patch('/activateDoctor',userController.activateDoctor);





module.exports=userRouter;