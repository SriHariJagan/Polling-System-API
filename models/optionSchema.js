const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option: String,
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  voters: [{
    type: mongoose.Schema.Types.ObjectId,
    voted : Boolean,
    ref: 'User'
  }],
  votes: 
  { 
    type: Number, 
    default: 0 
  }
});

module.exports = mongoose.model('Option', optionSchema);