const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your Name !']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email Address !'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter Valid Email !']

    },
    role: {
        type: String,
        enum: ['user', 'veternarian'],
        default: 'user'
    },
    photo: {
        type: String, // URL of the profile picture
        required: false,
        default: 'default.jpeg'
    },
    password: {
        type: String,
        required: [true, 'Please Enter your Password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm Your Password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password Not Match !'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,


    activate: {
        type: Boolean,
        default: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    this.passwordChangedAt = Date.now() - 1000;  // Set passwordChangedAt when password is updated
    next();
});



userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});


//global function
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};





const User = mongoose.model('User', userSchema);
module.exports = User;