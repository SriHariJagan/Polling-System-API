// Importing required modules
const express = require('express'); 
const port = 8000; 
const app = express(); 

const db = require('./config/mongoose'); // Mongoose configuration for MongoDB connection
const session = require('express-session'); // Middleware for session handling
const passport = require('./config/passport-local'); // Passport authentication configuration
const expressLayouts = require('express-ejs-layouts'); // Middleware for supporting EJS layouts

// Middleware to serve static files from 'assets' folder
app.use(express.static('asserts'));

// Middleware to parse incoming request form submissions
app.use(express.urlencoded());

// Setting up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to use layouts with EJS
app.use(expressLayouts);

// Setting up session middleware with a secret and other options
app.use(session({
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 600000 
    }
}));

// Initialize Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session()); 

// Middleware to set authenticated user information in views
app.use(passport.setAuthenticatedUser);

// Use the routers defined in the 'routers' folder for handling routes
app.use('/', require('./routers'));

// Start the server and listen on the defined port
app.listen(port, (err) => {
    if (err) {
        console.log("Error in express", err); 
        return;
    }
    console.log("Express is working...");
});
