// Importing required modules
const passport = require('passport'); // Passport library for authentication
const LocalStrategy = require("passport-local").Strategy; // Local strategy for authentication using email and password
const User = require('../models/userSchema'); // User model for database queries

// Defining the local strategy for authentication (email and password)
passport.use(new LocalStrategy({ passReqToCallback: true }, async function(req, email, password, done) {
    try {
        const user = await User.findOne({ email: email }); // Find user by email
        // If user not found or password does not match
        if (!user || (user.password != password)) { 
            return done(null, false); // Authentication failed
        }
        return done(null, user); // Authentication successful
    } catch (err) {
        console.log(err); // Log any errors
        return;
    }
}));

// Serializing user to store in session
passport.serializeUser(function(user, done) {
    return done(null, user); // Store user information in session
});

// Deserializing user from session
passport.deserializeUser(function(user, done) {
    return done(null, user); // Retrieve user information from session
});

// Middleware to check if user is authenticated
passport.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next(); // If authenticated, proceed to the next middleware
    }
    return res.redirect("/signinPage"); // If not authenticated, redirect to signin page
}

// Middleware to set authenticated user in response locals for views
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user; // Make user available in views
    }
    next();
}

// Export passport module
module.exports = passport;
