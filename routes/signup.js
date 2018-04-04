var express = require('express');
var router = express.Router();
var User = require('../model/usertools');
var {
  getUsername
} = require('../model/action');


/* Signup. */
router.get('/', (req, res, next) => {
  if(req.session){
    getUsername(req.session).then((username) => {
      return res.redirect('/user/'+username);
    }).catch(e=>{
      res.render('signup', { title: 'Register now !' });
    })
  } else {
    res.render('signup', { title: 'Register now !' });
  }
});

//POST route for updating data
router.post('/', (req, res, next) => {
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
      role:req.body.role,
    }

    User.create(userData, (error, user) => {
      console.log("signup js = ",`Running test at ${new Date().toISOString()}`);
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
