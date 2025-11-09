//why joi is used for validation
// Joi is a powerful schema description language and data validator for JavaScript. It allows developers to define the structure and constraints of data objects in a clear and concise manner. By using Joi, developers can ensure that the data being processed meets specific criteria before it is used in the application, which helps prevent errors, maintain data integrity, and enhance security.
// In this file, we define a schema for validating listing data using Joi. This schema specifies the required fields and their types, ensuring that any listing data conforms to the expected format before being processed or stored in the database.
// This is particularly useful in web applications where user input needs to be validated to prevent invalid or malicious data from being processed.
// Import the Joi library for data validation

const Joi = require('joi');

// Define the listing schema for validation
module.exports.listingSchema = Joi.object({ // Define the schema for a listing
    listing: Joi.object({ // The listing object
        title: Joi.string().required(), // Title is a required string
        description: Joi.string().required(), // Description is a required string
        location: Joi.string().required(), // Location is a required string
        country: Joi.string().required(), // Country is a required string
        price: Joi.number().required().min(0), // Price is a required number
        image: Joi.string().allow("",null) // Image is an optional string that can be empty or null
    }).required()
});

// listing schema for review validation
module.exports.reviewSchema = Joi.object({ // Define the schema for a review
    review: Joi.object({ // The review object
        comment: Joi.string().required(), // Comment is a required string
        rating: Joi.number().required().min(1).max(5) // Rating is a required number between 1 and 5
    }).required(),
});