const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing');

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
}

// function to initialize database
const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Database initialized");
}
initDB();