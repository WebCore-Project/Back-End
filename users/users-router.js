const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../auth/auth-middleware.js');

router.get('/users', restricted, (req, res) => {
    Users.find().then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)
    })
});

module.exports = router;
