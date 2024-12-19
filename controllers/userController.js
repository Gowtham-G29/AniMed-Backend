const User = require('../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');



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
}