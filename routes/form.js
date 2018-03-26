var express = require('express');
var router = express.Router();
var User = require('../tools/usertools');
var Form = require('../tools/formtools');

router.get('/', function(req, res, next) {
    res.redirect('/admin');
});

router.post('/', function(req, res, next) {
    var formData = {
        name: req.body.name,
        authorid: req.session.userId,
    }
    Form.create(formData, function(error, form){
        if(error){
            res.send(error);
        } else {
            return res.redirect('/form');
            return res.render('form', { name: req.body.name });
        }
    });
});

/* GET form details */
router.get('/:name', function(req, res, next) {
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
            name = req.params.name;
            Form.findOne({name: name}, function(err, form) {
                console.log(form.name);
                return res.render('form', { form: form });
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

/* GET form details */
router.get('/:name/delete', function(req, res, next) {
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
            name = req.params.name;
            Form.remove({name: name}, function(err, form) {
              Form.find({}, function(err, forms) {
                return res.render('admin', { user: user, forms: forms });
              });
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