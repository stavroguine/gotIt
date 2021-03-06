var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Question = new mongoose.Schema({
  name: {
    type: String,
    unique: false,  
    required: false,
    trim: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
    _id: false
})
  
var FormSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    version: {
      type: Number,
      required: true,
      default: 0,
      trim: true
    },
    questions:{
      type: [ Question ],
      index: false,
      default: []
    },
  });

FormSchema.pre('save', (next) => {
  var Form = this;
  if (Form.isNew && Form.questions.length === 0) {
    Form.questions = undefined;
}
  next();
});

var Form = mongoose.model('Form', FormSchema);

module.exports = Form;