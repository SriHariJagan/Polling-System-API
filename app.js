const express = require('express')
const port = 8000;
const app = express();

const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('./config/passport-local');
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('asserts'));
app.use(express.urlencoded());
app.set('view engine',"ejs");
app.use(expressLayouts);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
  }))


app.use(passport.initialize());
app.use(passport.session()) ;
app.use(passport.setAuthenticatedUser); 


app.use('/',require('./routers'));
app.listen(port,(err) =>{
    if(err){
        console.log("Error in express",err);
        return;
    }
    console.log("Express is working...");
});