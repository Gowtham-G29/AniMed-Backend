const Animal =require('../models/animalModel');
const AnimalOwner=require('../models/animalOwnerModel');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');



const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


exports.animalDetailsRegister=async(req,res,next)=>{
    try{
        if(!req.user){
            return res.status(401).json({
                status:'fail',
                message:'You are not logged In. Please log in and Continue !',
            })
        };
        
        req.body.userID=req.user._id;

        const newAnimal=await Animal.create(req.body);
        
        const token=signToken(req.user._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true, // true if in production
            sameSite: 'None', // Required for cross-origin cookies
        };

        res.cookie('jwt',token,cookieOptions);
        res.status(201).json({
            status:'Success',
            message:'New animal record is created',
            token,
            newAnimal
        });

    }catch(error){
        res.status(500).json({
            status:'fail',
            message:error.message
        });
    }
}






