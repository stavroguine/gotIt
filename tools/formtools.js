var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Question = new mongoose.Schema({
  name: {
    type: String,
    unique: false,  
    required: true,
    trim: true
  },
  authorid: {
      type: String,
      unique: false,
      required: true,
      trim: true
    }
})
  
var FormSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    authorid: {
        type: String,
        unique: false,
        required: true,
        trim: true
      },
    version: {
      type: Number,
      required: true,
      default: 0,
      trim: true
    },
    questions:{
      type: [ Question ],
      index: false
    },
  });

FormSchema.pre('save', function (next) {
  var Form = this;
  if (Form.isNew && Form.questions.length === 0) {
    Form.questions = undefined;
}
  next();
});

// Form.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, Form) {
//   if(error)
//       return next(error);
//   Form.testvalue = Form.version;
// });

var Form = mongoose.model('Form', FormSchema);
module.exports = Form;