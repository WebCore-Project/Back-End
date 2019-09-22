const router = require('express').Router();

const Vacations = require('./vacation-model.js');
const Users = require('../users/users-model.js');
const UsersVacation = require('../user-vacations/user-vacation-model.js');
const restricted = require('../auth/auth-middleware.js');

router.get('/vacations', (req, res) => {
    Vacations.find().then(vacs => {
        res.status(200).json(vacs)
    })
    .catch(err => {
        console.log(err)
    })
});
router.post('/add', restricted, validateVacation, (req, res) => {
    const vac = req.body;
    const { username } = req.user;
    console.log('username', username)
    Vacations.add(vac)
            .then(vacation => {
                const [vacId] = vacation;
                Users.findIdFromName(username).then(userId => {
                    UsersVacation.add(userId, vacId).then(userVacID => {
                        res.status(201).json(vacation)
                    })
                    .catch(err => {
                        console.log('err 1',err)
                        res.status(500).json(err);
                    })
                })
                .catch(err => {
                    console.log('err 2',err)
                    res.status(500).json(err);
                });
               
            })
            .catch(err => {
                console.log('err 3',err)
                res.status(500).json(err)
            });
});

router.post('/:vacId/adduser', restricted, validateUserVacLink, (req, res) => {
    const {username} = req.body
    console.log(username)
    Users.findIdFromName(username).then(userId => {
        UsersVacation.add(userId, req.vacId).then(userVacID => {
            res.status(201).json(userVacID)
        })
        .catch(err => {
            console.log('err1', err)
            res.status(500).json(err);
        })
    })
    .catch(err => {
        console.log('err2',err)
        res.status(500).json(err);
    });
});

//middleware

function validateVacation(req, res, next) {
    const { location, title } = req.body;
    if (!location && !title) {
        return res.status(400).json({message: 'Location and Title are required!'})
    }
    if (!location) {
        return res.status(400).json({message: 'Location is required!'})
    }
    if (!title) {
        return res.status(400).json({message: 'Title is required!'})
    }
    next();
}

function validateUserVacLink(req, res, next) {
    const { username } = req.user;
    const { vacId } = req.params;
    Users.findIdFromName(username).then(userId => {
        UsersVacation.check(userId, vacId).then(validLink => {
            console.log(validLink)
            if(validLink) {
                req.vacId = vacId;
                next();
            } else {
                res.status(403).json({message: 'You are not authorized to add a user to this vacation!'})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
    })
    .catch(err => {
        res.status(500).json(err);
    });

}

module.exports = router;