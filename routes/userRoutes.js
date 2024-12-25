const express=require('express');
const userController=require('../controllers/userController');
const authController=require('../controllers/authController');
const userRouter=express.Router();


userRouter.post('/signup',authController.signUp);
userRouter.post('/login/checkRegister',authController.login,authController.protect,authController.checkRegister);


userRouter.post('/forgotPassword',authController.forgotPassword);
userRouter.patch('/resetPassword/:token',authController.resetPassword);

userRouter.patch('/updateCurrentUserPassword',authController.protect,authController.updateCurrentUserPassword);
userRouter.patch('/updateMe',authController.protect,userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateMe);

userRouter.patch('/deleteMe',authController.protect,userController.deleteMe);
userRouter.post('/logout',authController.clearCookieLogout);

userRouter.get('/getMe',authController.protect,userController.getUserDetails);

userRouter.post('/userDetailsRegister',authController.protect,authController.userDetailsRegister);
userRouter.post('/vetDoctorDetailsRegister',authController.protect,authController.vetDoctorDetailsRegister);

module.exports=userRouter;