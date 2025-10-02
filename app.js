// Importing required modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const ejs = require("ejs");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// Setting up EJS as the templating engine with ejs-mate for layouts
app.engine("ejs", ejsMate);

// Middleware to override methods for PUT and DELETE requests
app.use(methodOverride("_method"));

// Database connection url
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to database
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// async function to connect to database
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Database connected");
}

// Serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.send("Hi I am root");
});

//to get all the listings from the database and render them using EJS
//Index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({}); // fetching all listings from the database
  res.render("listings/index.ejs", { allListings }); // rendering the listings using EJS and passing the fetched listings to the template
});

// to render a form to create a new listing
//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs"); // rendering the form to create a new listing
});

// to get a single listing by id and render it using EJS
//Show route
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params; // destructuring id from req.params
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//to create a new listing and save it to the database
//Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing); // creating a new listing using the data from the request body
  await newListing.save();
  res.redirect("/listings");
});

// to render a form to edit an existing listing
//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params; //destructuring id from req.params
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// to update an existing listing and save the changes to the database
//Update Route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //updating the listing by id with the new data from the request body
  res.redirect("/listings");
});

// to delete an existing listing from the database
//Delete Route
app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id); //deleting the listing by id
  console.log(deletedListing); //logging the deleted listing to the console
  res.redirect("/listings"); //redirecting to the listings page after deletion
});

// Test route to create a sample listing
// app.get("/testListings", async(req, res) => {
//   let sampleListing = new Listing({
//     title: "Sample Listing",
//     description: "This is a sample listing",
//     price: 10000,
//     location: "Sample Location",
//     country: "Sample Country",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("succesful testing");
// }
// );

// Connect to server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
