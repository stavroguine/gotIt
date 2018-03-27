const express = require('express');
const router = express.Router();
const {
  getUser, 
  getRole, 
  getForms, 
  getForm,
  removeForm
} = require('../model/action');

const Form = require('../model/formtools');

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
            //return res.render('form', { name: req.body.name });
        }
    });
});

/* GET form details */
router.get('/:name', function(req, res, next) {
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
router.get('/:name/delete', function(req, res, next) {
  getUser(req.session).then((user)=>{
    getRole(req.session).then((role)=>{

      if(role == "Admin"){

        removeForm(req.params.name).then(()=>{
      
          getForms().then((forms)=>{
            return res.render('admin', { user: user, forms: forms });
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
  }).catch(e=>{
    console.log("error = ",e);
    res.json("c'est mort 4")
  })
});
// .catch(e=>{
//     res.render('error',{e:e})
// })

module.exports = router; 