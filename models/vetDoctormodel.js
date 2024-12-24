const mongoose = require('mongoose');

const vetDoctorSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number, 
        required: true,
    },
    clinicName: {
        type: String,
        required: false,
    },
    clinicAddress: {
        type: String,
        required: false,
    },
    role: {
        type: String
    },
    profilePicture: {
        type: String, 
        required: false,
    },
    preferredLanguage: {
        type: String,
        default: 'English',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const VetDoctor = mongoose.model('VetDoctor', vetDoctorSchema);

module.exports = VetDoctor;
