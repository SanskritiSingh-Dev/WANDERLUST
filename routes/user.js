const express = require("express");
const router = express.Router();
let userSchema = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveRedirectUrl } = require("../middleware.js");

// Route to render signup form
router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

// Route to handle signup logic
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new userSchema({ username, email });
      const registeredUser = await userSchema.register(newUser, password); // registering user with password
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        // automatically log in the user after registration
        if (err) return next(err);
        req.flash("success", "Welcome to YaatriStay!");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

// Route to render login form
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    // using local strategy for authentication
    failureFlash: true, // enable flash messages on failure
    failureRedirect: "/login", // redirect to login page on failure
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to YaatriStay!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; // get redirect URL from locals or default to /listings
    res.redirect(redirectUrl); // redirect to original URL
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    // logout user
    if (err) {
      // handle error during logout
      return next(err); // pass error to the next middleware
    }
    req.flash("success", "Logged you out!"); // flash success message
    res.redirect("/listings");
  });
});

module.exports = router; // User routes would go here
