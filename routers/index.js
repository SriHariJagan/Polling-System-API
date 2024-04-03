const express = require('express');
const router = express.Router();
const passport = require('passport')

const indexController = require('../controllers/index');

router.get('/',indexController.home);
router.get('/signupPage',indexController.signup);
router.get('/signinPage',indexController.signin);
router.get('/logout',indexController.logout);



router.post('/signupData',indexController.signupData);
router.post('/signinData',passport.authenticate('local', { failureRedirect: '/signinPage'}),indexController.signinData);


router.use('/questions',require('./question'));


module.exports = router;