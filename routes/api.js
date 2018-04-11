const express = require('express');
const router = express.Router();
const {
  getUsername,
  authenticate
} = require('../model/action');

router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        let credentials = {
            email: req.body.email,
            password: req.body.password,
        }
        authenticate(credentials).then((user)=>{
            req.session.userId = user._id;
            req.session.role = user.role;
            console.log(user);
            return res.json(user);
        }).catch(e=>{
            console.log(e);
            res.json(e)
        })
    } else {
        res.status(400).send('Request incorrect');
    }
})

module.exports = router;