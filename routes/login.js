const express = require('express');
const router = express.Router();
const {
  getUsername,
  authenticate
} = require('../model/action');


router.get('/', (req, res, next) => {
  console.log(req.session.userId);
  if(req.session.userId){
    getUsername(req.session).then((username)=>{
      return res.redirect('/user/'+username);
    }).catch(e=>{
      console.log(e);
      res.render('error',{e:e})
    })
  } else {
    res.render('login', { title: 'Login now !' });
  }
});

router.post('/', (req, res, next) => {
  if (req.body.email && req.body.password) {
    let credentials = {
      email: req.body.email,
      password: req.body.password,
    }
    authenticate(credentials).then((user)=>{
      req.session.userId = user._id;
      req.session.role = user.role;
      return res.redirect('/user/'+user.username);
    }).catch(e=>{
      console.log(e);
      res.render('error',{e:e})
    })
  }
})

module.exports = router;