const mongoose = require('mongoose')
const validator = require('validator');

const animalOwnerSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        unique: true
    },
    Name: {
        type: String,
        required: [true, 'Please enter your Full name']
    },
    contactNumber: {
        type: String,
        required: [true, 'Please Enter the Mobile Number'],
    },
    telephoneNumber: {
        type: String
    },
    contactEmail: {
        type: String,
        required: [true, 'Please enter the Email !'],
        lowercase: true,
        validate: [validator.isEmail]
    },
    Address: {
        type: String,
        required: [true, 'Enter the Full address'],
    },
    role: {
        type: String
    },
    photo: {
        type: String, // URL of the profile picture
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


const animalOwner = mongoose.model('animalOwner', animalOwnerSchema);
module.exports = animalOwner;



