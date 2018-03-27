var express = require('express');
var session = require('express-session')
var router = express.Router();
var User = require('../model/usertools');


/* Unlogged. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

/* GET user page. */
router.get('/:id', function(req, res, next) {
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        return res.redirect('../login');
      } else {
        return res.render('user', { user: user, role: req.session.role });
      }
    }
  });
});

module.exports = router;
