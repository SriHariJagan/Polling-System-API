const express = require('express');
const router = express.Router(); // Create a new router instance
const passport = require('passport'); // Import passport for authentication

const questionsController = require('../controllers/questions'); // Import the questions controller

// Route to delete a question (requires authentication)
router.get('/delete/:id', passport.checkAuthenticated, questionsController.deleteQuestion);

// Route to delete an option (requires authentication)
router.get('/options/delete/:optionId', passport.checkAuthenticated, questionsController.deletOption);

// Route to add a vote to an option (requires authentication)
router.get('/options/add_vote/:id', passport.checkAuthenticated, questionsController.votes);

// Route to create a new question (requires authentication)
router.post('/create', passport.checkAuthenticated, questionsController.createQuestion);

// Route to create a new option for a question (requires authentication)
router.post('/options/create', passport.checkAuthenticated, questionsController.createOption);

// Export the router module
module.exports = router;
