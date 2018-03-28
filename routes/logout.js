var express = require('express');
var router = express.Router();

/* Logout. */
router.get('/', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
        if (err) {
            return next(err);
        } else {
            return res.redirect('/');
        }
        });
    }
});

module.exports = router;




