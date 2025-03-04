const User = require('../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const animalOwner = require('../models/animalOwnerModel');
const Email = require('../utils/email');
const VetDoctor = require('../models/vetDoctormodel');
const animal = require('../models/animalModel');



const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(res.status(400).json({
            status: 'Fail',
            message: 'Not an image ! Please upload the image'
        }));
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
    if (!req.file) {
        return next();
    }
    req.file.filename = `user-${req.user.id}--${Date.now()}.jpeg`;
    const outputPath = path.join(__dirname, '../public/user/profile');

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });

    }

    try {
        await sharp(req.file.buffer)
            .resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`${outputPath}/${req.file.filename}`);
        next();
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    })
    return newObj;
};

exports.updateMe = async (req, res, next) => {

    try {
        if (req.body.password || req.body.passwordConfirm) {
            return res.status(400).json({
                status: 'Fail',
                message: 'This route is not for the Password update'
            })
        }

        const filteredBody = filterObj(req.body, 'name', 'email');
        if (req.file) {
            filteredBody.photo = req.file.filename;
        };

        const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'Success',
            data: {
                user: updateUser
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }

};

exports.deleteMe = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged In.Please log in to delete your Account!'
            })
        }

        await User.findByIdAndUpdate(req.user._id, { activate: false });
        res.status(200).json({
            status: 'Success',
            message: 'Your Account has been Successfully Deactivated.'
        });

    } catch (error) {
        res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong while deactivating your account'
        });
    }
};


exports.getUserDetails = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                status: 'Fail',
                message: 'User Not Found'
            })
        };
        const user = await User.findById(req.user._id);



        return res.status(200).json({
            status: 'Success',
            message: 'User Details',
            user
        })

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })

    }
};


exports.getAnimalOwnerDetails = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Animal owner Not Found !'
            })
        };

        const AnimalOwner = await animalOwner.findOne({ userID: req.user._id });
        return res.status(200).json({
            status: 'Success',
            message: 'Animal Owner Details',
            AnimalOwner
        })

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
};


exports.getNearbyDoctorsLocation = async (req, res, next) => {
    try {
    
        const { userID } = req.query;
        if (!userID) {
            return res.status(400).json({
                status: 'fail',
                message: 'User ID is required'
            });
        }

        const AnimalOwner = await animalOwner.findOne({ userID });
        if (!AnimalOwner) {
            return res.status(403).json({
                status: 'fail',
                message: 'No animal owner found for this user'
            });
        }

        const { district } = AnimalOwner;

        const doctorsNearby = await VetDoctor.find({ district });
        if (doctorsNearby.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No doctors found in the nearby location'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Doctors found in the nearby location',
            data: doctorsNearby
        });
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            status: 'fail',
            message: 'An error occurred while fetching nearby doctors',
            error: error.message
        });
    }
};

exports.getDoctorDetails = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Animal owner Not Found !'
            })
        };

        const doctor = await VetDoctor.findOne({ userID: req.user._id });
        return res.status(200).json({
            status: 'Success',
            message: 'Animal Owner Details',
            doctor
        })

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        })
    }
}



exports.getAnimalOwnerContacts = async (req, res, next) => {
    try {
        const animalID = req.query._id;

        if (!animalID) {
            return res.status(400).json({
                status: "fail",
                message: "Animal ID is required",
            });
        }

        // Find the animal
        const animalData = await animal.findOne({ _id: animalID }).select("ownerID");

        if (!animalData) {
            return res.status(404).json({
                status: "fail",
                message: "Animal not found",
            });
        }

        const ownerID = animalData.ownerID;

        // Find the owner details
        const ownerContact = await animalOwner.findOne({ userID: ownerID });

        if (!ownerContact) {
            return res.status(404).json({
                status: "fail",
                message: "Owner details not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Animal owner details retrieved successfully",
            ownerContact,
        });

    } catch (error) {
        console.error("Error fetching animal owner contacts:", error);
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getVetDoctorDetails=async(req,res,next)=>{
    try {
        if(!req.user._id){
            return res.status(401).json({
                status:'fail',
                message:' user Not found please login and try again!.'
            })
        }

        const doctorInformations=await VetDoctor.findOne({userID:req.user._id});

        if(!doctorInformations){
            return res.status(401).json({
                status:'fail',
                message:'veternary doctor not found in this ID'
            })
        }

        return res.status(200).json({
            status:'success',
            message:'Veternary doctor information successfully retrived!',
            doctorInformations
        })
        
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            message:error.message
        })
        
    }
}

exports.approveDoctors=async(req,res,next)=>{
    try{
        
        const doctors = await User.find({ role: "veternarian" }).select("_id activate");

        if (!doctors || doctors.length === 0) {
            return res.status(403).json({
                status: 'fail',
                message: 'Doctors Not found'
            });
        }
        
        const doctorIds = doctors.map(doc => doc._id);
    
        const doctorDetails = await VetDoctor.find({ userID: { $in: doctorIds } });
        
        res.status(200).json({
            status: 'success',
             doctors,
             doctorDetails
        });
        

    }catch(error){

        res.status(500).json({
            status:'Fail',
            message:error.message
        })
    }
}






