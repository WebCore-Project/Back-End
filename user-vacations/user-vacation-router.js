const router = require('express').Router();
const UserVacation = require('./user-vacation-model.js');
const restircted = require('../auth/auth-middleware.js');

router.get('/usersvacations', (req, res) => {
    UserVacation.find().then(vacs => {
        res.status(200).json(vacs)
    }).catch(err => {
        res.status(500).json(err)
    })

});



module.exports = router;