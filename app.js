const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Database connection url
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// async function to connect to database
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Database connected");
}

// Connect to database
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Connect to server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// basic API
app.get("/", (req, res) => {
  res.send("Hi I am root");
});
