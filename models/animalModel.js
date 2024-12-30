const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [false, 'Please enter the animal Name!']
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
    },
    gender: {
        type: String,
        required: [false, 'Please Enter the Animal Gender!'],
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
                required: false,
            },
            type: {
                type: String,
                required: false,
            },
        },
    ],
    previousIllnesses: [
        {
            name: {
                type: String,
                required: false,
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
                required: false,
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
                required: false,
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
                required: false,
            },
        ],
        onsetDate: {
            type: Date,
            required: false,
        },
        severity: {
            type: String,
            required: false,
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
    geolocation: {
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },

    doctorSuggestions:
    {
        medicine: {
            type: String,
            required: false,
            default: 'None'
        },
        preventionMethods: {
            type: String,
            required: false,
            default: 'None'
        },
        remarks: {
            type: String,
            required: false,
            default: 'None'
        },
        suggestedBy: {
            type: String,
            required: false,
            default: 'Not yet viewed by doctor !'
        },
        animalOwnerViewedStatus: {
            type: Boolean,
            required: false,
            default: false
        },

        doctorSuggestedStatus: {
            type: Boolean,
            required: false,
            default: false
        }
    }

    ,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});





const animal = mongoose.model('animal', animalSchema);
module.exports = animal;


// const mongoose = require('mongoose');

// const animalSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   species: { type: String, required: true },
//   breed: { type: String, required: true },
//   gender: { type: String, required: true },
//   weight: { type: String, required: false },
//   uniqueIdentificationMark: { type: String, required: false },
//   vaccinationRecords: [{
//     date: { type: Date, required: true },
//     type: { type: String, required: true },
//   }],
//   previousIllnesses: [{
//     name: { type: String, required: false },
//     details: { type: String, required: false },
//   }],
//   surgicalHistory: [{
//     name: { type: String, required: false },
//     date: { type: Date, required: false },
//   }],
//   allergies: [{ type: String, required: false }],
//   currentComplaint: {
//     symptoms: [{ type: String, required: false }],
//     onsetDate: { type: Date, required: false },
//     severity: { type: String, required: false },
//     behaviorChanges: { type: String, required: false },
//     dietaryChanges: { type: String, required: false },
//   },
//   insurance: { type: String, required: false },
//   ownerShipDocument: { type: String, required: false },
// });

// module.exports = mongoose.model('Animal', animalSchema);
