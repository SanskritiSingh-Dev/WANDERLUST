const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Listing schema
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String},
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
});
// Create and export the Listing model
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;