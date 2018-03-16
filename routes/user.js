var express = require('express');
var session = require('express-session')
var router = express.Router();

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
        var err = new Error('Not authorized! Go back!');
        err.status = 400;
        return next(err);
      } else {
        return res.render('user', { user: user });
      }
    }
  });
});

module.exports = router;
