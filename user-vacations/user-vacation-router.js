const router = require('express').Router();
const UserVacation = require('./user-vacation-model.js');
const restircted = require('../auth/auth-middleware.js');

router.get('/', (req, res) => {
    UserVacation.find().then(vacs => {
        res.status(200).json(vacs)
    }).catch(err => {
        res.status(500).json(err)
    })

});

router.delete('/:userId/delete', (req, res) => {
    const {userId} = req.params;
    UserVacation.remove(userId).then(deleted => {
        res.status(200).json(deleted);
    }).catch(err => {
        res.status(404).json({message: 'Invalid ID'})
    });
})

//middleware
function validateUserId(id) {
    
}

module.exports = router;