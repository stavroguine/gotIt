var express = require('express');
var router = express.Router();

/* Unlogged. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

/* GET user page. */
router.get('/:id', function(req, res, next) {
  res.render('user', { user: req.params.id });
});

module.exports = router;
