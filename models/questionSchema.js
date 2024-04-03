const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Option' 
  }]
});

module.exports = mongoose.model('Question', questionSchema);
