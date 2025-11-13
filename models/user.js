// models/user.js
// User model definition using Mongoose and Passport-Local-Mongoose for authentication
// This model includes an email field and integrates with Passport for handling username and password
// It simplifies user authentication by adding necessary fields and methods.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose); // Integrate Passport-Local-Mongoose to handle username and password
module.exports = mongoose.model('User', userSchema);