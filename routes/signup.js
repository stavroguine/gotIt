var express = require('express');
var router = express.Router();
var User = require('../usertools');

/* Signup. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Register now !' });
});

//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  console.log('coucou');
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/login');
      }
    });

  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})


module.exports = router;
