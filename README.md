# Polling System API
  -  This repository contains the code for a polling system API developed in Node.js.

## Project Overview:
  - The Polling System API allows authenticated users to create questions, add options to questions, and vote for options. User identity is required to interact with the API.

## Features:
  - Authenticate users.
  - Create questions.
  - Add options to questions.
  - Add votes to options.
  - View questions with their options and votes.
  - Delete questions and options.

## Setup Instructions:
  1) Clone the repository to your local machine:
     - git clone https://github.com/SriHariJagan/Polling-System-API.git.

  2) Install dependencies:
     - cd polling-system-api.
     - npm install.
    
  3) Configure the database:
     - Update the database configuration in `config/database.js` file according to your database setup.

  4) Run the server:
     - npm start.
     - The server will start running on `http://localhost:8000`.


 ## API Routes:
   - GET '/': Renders the home page.
   - GET '/signupPage': Renders the signup page.
   - GET '/signinPage': Renders the signin page.
   - GET '/logout': Logs out the user.
   - POST '/signupData': Handles user signup data submission.
   - POST '/signinData': Handles user signin data submission. Uses Passport.js middleware for authentication.
   - GET '/delete/:id': Deletes a question with the specified ID. Requires authentication.
   - GET '/options/delete/:optionId': Deletes an option with the specified ID. Requires authentication.
   - GET '/options/add_vote/:id': Adds a vote to an option with the specified ID. Requires authentication.
   - POST '/create': Creates a new question. Requires authentication.
   - POST '/options/create': Creates a new option for a question. Requires authentication.

## Folder Structure:

        
        │
        ├── app.js                    # Main entry point of the application
        │
        ├── asserts/                  # Directory for static assets
        │   ├── images/
        │   ├── css/
        │   └── js/
        │
        ├── config/                   # Configuration files
        │   ├── database.js           # Database configuration
        │   └── passport.js           # Passport authentication configuration
        │
        ├── controllers/              # Controllers for handling HTTP requests
        │   ├── indexController.js    # Controller for handling index routes
        │   └── questionsController.js # Controller for handling questions-related routes
        │
        ├── models/                   # Data models
        │   ├── user.js               # Model for user data
        │   └── question.js           # Model for question data
        │
        ├── routers/                  # Router files
        │   ├── indexRouter.js        # Router for index routes
        │   └── questionsRouter.js    # Router for questions-related routes
        │
        ├── views/                    # View templates
        │   ├── index.ejs             # Main index view
        │   ├── signup.ejs            # Signup form view
        │   ├── signin.ejs            # Signin form view
        │   └── question.ejs          # View for displaying questions and options
        │
        ├── package.json              # Metadata and dependencies
        ├── package-lock.json         # Lock file for dependency versions
        └── README.md                 # Instructions and documentation

## Demo Link:
  - https://polling-system-api-l9yw.onrender.com

##  Images:


![image](https://github.com/SriHariJagan/Polling-System-API/assets/100404902/0b261098-9dd1-4eed-aff6-e79d1ad5ed4c)



![image](https://github.com/SriHariJagan/Polling-System-API/assets/100404902/cb3d87a7-bebf-4bdc-8ccf-14f071149466)










