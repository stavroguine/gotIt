const express = require('express');
const router = express.Router();
const {
  //getUsername, 
  getRole, 
  getForms, 
  getForm,
  createForm,
  removeForm
} = require('../model/action');

router.get('/',(req, res, next) => {
    res.redirect('/admin');
});

router.post('/',(req, res, next) => {
    var formData = {
        name: req.body.name,
        authorid: req.session.userId,
    }
    createForm(formData).then(()=>{
      res.redirect('/admin');
    })
});

/* GET form details */
router.get('/:name',(req, res, next) => {
  getRole(req.session).then((role)=>{
    if(role == "Admin"){
      getForm(req.params.name).then((form)=>{
        return res.render('form', { form: form });
      })  
    }
  }).catch(e=>{
    res.render('error',{e:e})
  })
});

/* GET form details */
router.get('/:name/delete',(req, res, next) => {
  getRole(req.session).then((role)=>{
    if(role == "Admin"){
      removeForm(req.params.name).then(()=>{
        getForms().then((forms)=>{
          res.redirect('/admin');
        }).catch(e=>{
          console.log("error = ",e);
          res.json("c'est mort")
        })
      }).catch(e=>{
        console.log("error = ",e);
        res.json("c'est mort 2")
      })
    }
  }).catch(e=>{
    console.log("error = ",e);
    res.json("c'est mort 3")
  })
});

module.exports = router; 