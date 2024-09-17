// Importing required models
const User = require('../models/userSchema'); 
const Question = require('../models/questionSchema'); 

// Controller to render the home page with all questions
module.exports.home = async (req, res) => {
  // Fetch all questions and populate associated user and options
  const question = await Question.find({})
    .populate('user') // Populate the 'user' field
    .populate({ path: 'options' }); // Populate the 'options' field

  // Render the home page and pass the fetched questions
  return res.render('homePage', { questions: question });
}

// Controller to render the signup page
module.exports.signup = (req, res) => {
    return res.render('signupPage'); 
}

// Controller to render the signin page
module.exports.signin = (req, res) => {
    return res.render('signinPage');
}

// Controller to handle signup data and create new user
module.exports.signupData = async (req, res) => {
    // Check if user with the same email already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        // If user exists, redirect to signin page
        return res.redirect('/signinPage');
    } else {
        // If user doesn't exist, create a new user
        const newUser = await User.create(req.body);
        if (newUser) {
            return res.redirect('/signinPage'); // Redirect to signin page on success
        } else {
            return res.redirect('/signupPage'); // Redirect to signup page on failure
        }
    }
}

// Controller to handle signin data (redirecting after successful login)
module.exports.signinData = (req, res) => {
    return res.redirect('/');
}

// Controller to handle user logout
module.exports.logout = (req, res) => {
    return req.logout(req.user, err => {
        if (err) return next(err); // Handle logout errors if any
        res.redirect("/"); // Redirect to home page after logout
    });
}
