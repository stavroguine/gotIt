var express = require('express');
var session = require('express-session')
var router = express.Router();
var User = require('../tools/usertools');


/* Unlogged. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

/* GET user page. */
router.get('/:id', function(req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    console.log(req.user);
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        return res.redirect('../login');
      } else {
        console.log(user);
        return res.render('user', { user: user, role: req.session.role });
      }
    }
  });
});

module.exports = router;
