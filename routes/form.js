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
            return res.redirect('/admin');
        }
    });
});

/* GET user page. */
router.get('/:name', function(req, res, next) {
    return res.render('form', { name: req.params.name });
});


module.exports = router; 