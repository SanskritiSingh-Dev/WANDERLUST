const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

// Review Schema
// Defines the structure of review documents in the database
// Each review has a comment, a rating between 1 and 5, and a createdAt timestamp
// The rating field is required and must be between 1 and 5
// The createdAt field defaults to the current date and time
// This schema can be expanded with additional fields as needed.
const reviewSchema = new Schema({
    comment: String,
    rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Review", reviewSchema);