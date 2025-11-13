// what are we doing exactly?
// This file defines the routes for handling listings in an Express.js application.
// It includes routes for creating, reading, updating, and deleting listings,
// as well as middleware for validating listing and review data using Joi schemas.

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware.js");

// Middleware function to validate listing data using Joi schema
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); // validate the request body against the listing schema
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(","); // create an error message from the validation errors
    throw new ExpressError(errmsg, 400); // if validation fails, throw an error
  } else {
    next(); // if validation passes, proceed to the next middleware/route handler
  }
};


//to get all the listings from the database and render them using EJS
//Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({}); // fetching all listings from the database
    res.render("listings/index.ejs", { allListings }); // rendering the listings using EJS and passing the fetched listings to the template
  })
);

// to render a form to create a new listing
//New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs"); // rendering the form to create a new listing
});

// to get a single listing by id and render it using EJS
//Show route
router.get(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params; // destructuring id from req.params
    const listing = await Listing.findById(id).populate("reviews"); // fetching the listing by id and populating the reviews
    if(!listing){
      req.flash("error", "Cannot find that listing!");  // flash message if listing not found
      return res.redirect("/listings"); // redirecting to listings page if listing not found
    }
    res.render("listings/show.ejs", { listing });
  })
);

//to create a new listing and save it to the database
//Create Route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing); // creating a new listing using the data from the request body
    await newListing.save();
    req.flash("success", "Successfully made a new listing!"); // flash message for successful creation
    res.redirect("/listings");
  })
);

// to render a form to edit an existing listing
//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params; //destructuring id from req.params
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Cannot find that listing!");  // flash message if listing not found
      return res.redirect("/listings"); // redirecting to listings page if listing not found
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// to update an existing listing and save the changes to the database
//Update Route
router.put(
  "/:id",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    }); //updating the listing by id with the new data from the request body
    req.flash("success", "Successfully updated the listing!"); // flash message for successful update
    res.redirect("/listings");
  })
);

// to delete an existing listing from the database
//Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); //deleting the listing by id
    console.log(deletedListing); //logging the deleted listing to the console
    req.flash("success", "Successfully deleted the listing!"); // flash message for successful deletion
    res.redirect("/listings"); //redirecting to the listings page after deletion
  })
);

module.exports = router;