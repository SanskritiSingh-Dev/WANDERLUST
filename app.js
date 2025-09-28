const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

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

// basic API
app.get("/", (req, res) => {
  res.send("Hi I am root");
});

// Test route to create a sample listing
app.get("/testListings", async(req, res) => {
  let sampleListing = new Listing({
    title: "Sample Listing",
    description: "This is a sample listing",
    price: 10000,
    location: "Sample Location",
    country: "Sample Country",
  });
  await sampleListing.save();
  console.log("sample was saved");
  res.send("succesful testing");
}
);

// Connect to server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
