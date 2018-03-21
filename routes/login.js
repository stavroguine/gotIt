var express = require('express');
var router = express.Router();
var User = require('../tools/usertools');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        res.render('login', { title: 'Login now !' });
      } else {
        return res.redirect('/user/'+user.username);
      }
    }
  });
});

router.post('/', function (req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return next(err);
      } else {
        req.session.userId = user._id;
        console.log(user._id);
        req.session.role = user.role;
        return res.redirect('/user/'+user.username);
      }
    });
  }
})

module.exports = router;