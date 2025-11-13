//for authentication middleware
// to check if the user is logged in

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // checking if the user is authenticated
    req.session.redirectUrl = req.originalUrl; // storing the original URL in the session
    req.flash("error", "You must be signed in to create a new listing!");
    return res.redirect("/login");
  }
  next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // making redirectUrl available in locals
  }
    next();
};