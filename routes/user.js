var express = require('express');
var session = require('express-session')
var router = express.Router();
var User = require('../model/usertools');


/* Unlogged. */
router.get('/', (req, res, next) => {
  res.redirect('/login');
});

/* GET user page. */
router.get('/:id', (req, res, next) => {
  User.findById(req.session.userId)
  .exec((error, user) => {
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
