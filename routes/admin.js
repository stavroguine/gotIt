var express = require('express');
var router = express.Router();
var User = require('../model/usertools');
var Form = require('../model/formtools');

/* Admin page. */
router.get('/', function(req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error('Not authorized! Go back!');
        err.status = 400;
        return next(err);
      } else {
        if(req.session.role == "Admin"){
          Form.find({}, function(err, forms) {
            return res.render('admin', { user: user, forms: forms });
           });
        } else {
          var err = new Error('Not authorized! Admin zone !!!');
          err.status = 400;
          return next(err);
        }
      }
    }
  });
});

module.exports = router;
