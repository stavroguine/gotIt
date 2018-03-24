var express = require('express');
var router = express.Router();
var User = require('../tools/usertools');
var Form = require('../tools/formtools');

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
            console.log(forms);
            return res.render('admin', { user: user, forms: forms });
           });
        } else {
          //console.log(req.session.role);
          var err = new Error('Not authorized! Admin zone !!!');
          err.status = 400;
          return next(err);
        }
      }
    }
  });
});

module.exports = router;
