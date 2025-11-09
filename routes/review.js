const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");

//validate review middleware
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body); // validate the request body against the review schema
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(","); // create an error message from the validation errors   
    throw new ExpressError(errmsg, 400); // if validation fails, throw an error
  } else {
    next(); // if validation passes, proceed to the next middleware/route handler
  }
};

//Review routes would go here
//Post route to create a new review for a listing
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => { 
    let listing = await Listing.findById(req.params.id); //finding the listing by id
    let newReview = new Review(req.body.review); //creating a new review using the data from the request body
    listing.reviews.push(newReview); //adding the new review to the listing's reviews array
    await newReview.save(); //saving the new review to the database
    await listing.save(); //saving the updated listing to the database
    res.redirect(`/listings/${listing._id}`); //redirecting to the listing's show page
  })
);

//Delete route to delete a review from a listing
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => { 
    let { id, reviewId } = req.params; //destructuring id and reviewId from req.params
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //removing the reviewId from the listing's reviews array
    await Review.findByIdAndDelete(reviewId); //deleting the review by reviewId
    res.redirect(`/listings/${id}`); //redirecting to the listing's show page
  }
));

module.exports = router;