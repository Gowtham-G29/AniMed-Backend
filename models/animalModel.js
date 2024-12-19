const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.ObjectId,
        ref: 'animalOwner'
    },
    name: {
        type: String,
        required: [true, 'Please enter the animal Name!']
    },
    species: {
        type: String,
        required: [true, 'Please Enter the Species Name!']
    },
    breed: {
        type: String,
        required: [true, 'Please Enter the Breed Name']
    },
    age: {
        type: String,
        // required:[true,'Please Enter the Animal Age']
    },
    gender: {
        type: String,
        required: [true, 'Please Enter the Animal Gender!'],
        enum: ['male', 'female', 'others']
    },
    weight: {
        type: String,
    },
    uniqueIdentificationMark: {
        type: String
    },
    // Medical History
    vaccinationRecords: [
        {
            date: {
                type: Date,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
        },
    ],
    previousIllnesses: [
        {
            name: {
                type: String,
                required: true,
            },
            details: {
                type: String,
                required: false,
            },
        },
    ],
    medicationHistory: [
        {
            name: {
                type: String,
                required: true,
            },
            duration: {
                type: String,
                required: false, // Example: "2 weeks"
            },
        },
    ],
    surgicalHistory: [
        {
            name: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: false,
            },
        },
    ],
    allergies: [
        {
            type: String, // Food, medications, or environmental allergens
            required: false,
        },
    ],

    // Current Health Complaint
    currentComplaint: {
        symptoms: [
            {
                type: String,
                required: true,
            },
        ],
        onsetDate: {
            type: Date,
            required: true,
        },
        severity: {
            type: String,
            required: true,
            enum: ['Mild', 'Moderate', 'Severe'],
        },
        behaviorChanges: {
            type: String,
            required: false,
        },
        dietaryChanges: {
            type: String,
            required: false,
        },
    },
    insurance: {
        type: String
    },
    ownerShipDocument: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



const animal = mongoose.model('animal', animalSchema);
module.exports = animal;