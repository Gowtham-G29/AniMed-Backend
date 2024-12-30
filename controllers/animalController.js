const Animal = require('../models/animalModel');
const AnimalOwner = require('../models/animalOwnerModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


exports.animalDetailsRegister = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged In. Please log in and Continue !',
            })
        };

        req.body.ownerID = req.user._id;

        const newAnimal = await Animal.create(req.body);

        const token = signToken(req.user._id);
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true, // true if in production
            sameSite: 'None', // Required for cross-origin cookies
        };

        res.cookie('jwt', token, cookieOptions);
        res.status(201).json({
            status: 'Success',
            message: 'New animal record is created',
            token,
            newAnimal
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.getAnimalDetails = async (req, res, next) => {

    try {
        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'User Not logged in. please logged in and Try again later!'
            });
        }

        const animals = await Animal.find({ ownerID: req.user._id });
        res.status(201).json({
            status: 'Success',
            message: "Animals for this User is received",
            data: animals
        });

    } catch (error) {

        return res.status(500).json({
            status: 'fail',
            message: error.message
        })

    };
};

exports.deleteAnimal = async (req, res, next) => {
    try {
        const animalID = req.body.animalID; 

        if (!animalID) {
            return res.status(401).json({
                status: "fail",
                message: 'Animal not found'
            });
        }

        const deletingAnimal = await Animal.findByIdAndDelete(animalID);

        if (!deletingAnimal) {
            return res.status(404).json({
                status: 'fail',
                message: 'Animal not found for deletion'
            });
        }

        res.status(204).json({
            status: 'success',
            message: 'Your requested animal was successfully deleted!',
            deletedAnimal: deletingAnimal
        });

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};


exports.updateAnimal = async (req, res, next) => {
    try {
        const animalID = req.body._id;

        if (!animalID) {
            return res.status(400).json({
                status: 'fail',
                message: 'No animal ID provided'
            });
        }

        // Prepare the updateData object by spreading the request body
        const updateData = { ...req.body };
        delete updateData._id;  // Ensure _id is not part of the update data

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'No fields provided to update'
            });
        }

        // Prepare the update object for MongoDB
        let updateQuery = {};

        // Dynamically build the update query
        if (updateData.doctorSuggestions) {
            const doctorSuggestionsUpdates = {};
            if (updateData.doctorSuggestions.animalOwnerViewedStatus !== undefined) {
                doctorSuggestionsUpdates['animalOwnerViewedStatus'] = updateData.doctorSuggestions.animalOwnerViewedStatus;
            }
            if (updateData.doctorSuggestions.doctorSuggestedStatus !== undefined) {
                doctorSuggestionsUpdates['doctorSuggestedStatus'] = updateData.doctorSuggestions.doctorSuggestedStatus;
            }
            if (updateData.doctorSuggestions.medicine !== undefined) {
                doctorSuggestionsUpdates['medicine'] = updateData.doctorSuggestions.medicine;
            }
            if (updateData.doctorSuggestions.preventionMethods !== undefined) {
                doctorSuggestionsUpdates['preventionMethods'] = updateData.doctorSuggestions.preventionMethods;
            }
            if (updateData.doctorSuggestions.remarks !== undefined) {
                doctorSuggestionsUpdates['remarks'] = updateData.doctorSuggestions.remarks;
            }
            if (updateData.doctorSuggestions.suggestedBy !== undefined) {
                doctorSuggestionsUpdates['suggestedBy'] = updateData.doctorSuggestions.suggestedBy;
            }

            if (Object.keys(doctorSuggestionsUpdates).length > 0) {
                updateQuery['doctorSuggestions'] = doctorSuggestionsUpdates;
            }
        }

        // Perform the update using the dynamically built updateQuery
        const animalUpdated = await Animal.findByIdAndUpdate(
            animalID,
            { $set: updateQuery },
            { new: true }
        );

        if (!animalUpdated) {
            return res.status(404).json({
                status: 'fail',
                message: 'Animal not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Animal updated successfully',
            animalUpdated
        });

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};
