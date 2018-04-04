var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const util = require('util');
const SALT_WORK_FACTOR = 10;


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
  }
});

//authenticate input against database
UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email })
    .exec((err, user) => {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  //console.log("usertools = "+this);
  console.log("usertools = ",`Running test at ${new Date().toISOString()}`);
  //console.log("usertools = "+util.inspect(this, {showHidden: false, depth: null}))
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    })
  });
});


var User = mongoose.model('User', UserSchema);
module.exports = User;