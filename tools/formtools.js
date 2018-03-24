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

FormSchema.pre('save', function (next) {
  var Form = this;
  if (Form.isNew && Form.questions.length === 0) {
    Form.questions = undefined;
}
  next();
});

var Allformsname = function(req, res, next) {
  var query = db.forms.find({}).select({ "name": 1, "_id": 0});

  query.exec(function (err, someValue) {
      if (err) return next(err);
      res.send(someValue);
  });
};


// Form.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, Form) {
//   if(error)
//       return next(error);
//   Form.testvalue = Form.version;
// });

var Form = mongoose.model('Form', FormSchema);
module.exports = Form;