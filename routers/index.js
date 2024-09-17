const express = require('express');
const router = express.Router(); // Create a new router instance
const passport = require('passport'); // Import passport for authentication

const indexController = require('../controllers/index'); // Import the index controller

// render the home page
router.get('/', indexController.home);

// render the signup page
router.get('/signupPage', indexController.signup);

// render the signin page
router.get('/signinPage', indexController.signin);

// handle user logout
router.get('/logout', indexController.logout);

// handle signup form submission
router.post('/signupData', indexController.signupData);

// handle signin form submission with passport authentication
router.post('/signinData', 
    passport.authenticate('local', { failureRedirect: '/signinPage' }), // Authenticate using Passport's local strategy
    indexController.signinData // If successful, redirect using the controller function
);

// Middleware to use question-related routes 
router.use('/questions', require('./question'));

// Export the router module
module.exports = router;
