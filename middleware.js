//for authentication middleware
// to check if the user is logged in

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){ // checking if the user is authenticated
    req.flash("error", "You must be signed in to create a new listing!");
    return res.redirect("/login");
    }
    next();
};