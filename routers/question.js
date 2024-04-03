const express = require('express');
const router = express.Router();
const passport = require('passport')

const questionsController = require('../controllers/questions');

router.get('/delete/:id',passport.checkAuthenticated,questionsController.deleteQuestion);
router.get('/options/delete/:optionId',passport.checkAuthenticated,questionsController.deletOption);
router.get('/options/add_vote/:id',passport.checkAuthenticated,questionsController.votes);

router.post('/create',passport.checkAuthenticated,questionsController.createQuestion);
router.post('/options/create',passport.checkAuthenticated,questionsController.createOption);


module.exports = router;