const express = require('express');
const router = express.Router();
const {
  getUserObject,
  getRole,
  getForms
} = require('../model/action');

/* Admin page. */
router.get('/',(req, res, next) => {
  getUserObject(req.session).then((user)=>{
    getRole(req.session).then((role)=>{
      if(role == "Admin"){
        getForms().then((forms)=>{
          return res.render('admin', { user: user, forms: forms });
        }).catch(e=>{
          res.render('error',{e:e})
        })
      }
    }).catch(e=>{
      res.render('error',{e:e})
    })
  }).catch(e=>{
    res.render('error',{e:e})
  })
});

module.exports = router;
