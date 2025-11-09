const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

// Define the Listing schema
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, 
    default: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0 ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    set: (v) => v === "" ? "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0 ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  // Array of references to Review documents
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => { // middleware function triggered after a listing is deleted
  if (listing) {
    await review.deleteMany({ // deleting all reviews associated with the deleted listing
      _id: {
        $in: listing.reviews, // using the $in operator to match all review IDs in the listing's reviews array
      },
    });
  }
});
// Create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
