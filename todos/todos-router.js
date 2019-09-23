const router = require('express').Router({mergeParams:true});
const Users = require('../users/users-model.js');
const restricted = require('../auth/auth-middleware.js');
const UsersVacation = require('../user-vacations/user-vacation-model.js')
const Todos = require('./todos-model.js');

router.post('/add', restricted, validateUserVacLink, (req, res) => {
    const { suggestion } = req.body;
    const username = rec.user
    if (!suggestion) {
        return res.status(400).json({ message: 'Todo required!' });
    }
    Users.findIdFromName(username).then(userId => {
        Todos.add(userId, req.vacId, suggestion).then(userVacID => {
            res.status(201).json(userVacID)
        })
            .catch(err => {
                console.log('err1', err)
                res.status(500).json(err);
            })
    })
        .catch(err => {
            console.log('err2', err)
            res.status(500).json(err);
        });
});

router.get('/', restricted, validateUserVacLink, (req, res) => {
    Todos.find(req.vacId).then(todos => {
        if(todos.length) {
            res.status(200).json(todos)
        } else {
            return res.status(400).json({message: 'No todos found!'})
        }
    })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
});

router.delete('/:id/delete', restricted, validateUserVacLink, validateTodoById, (req, res) => {
    const { id } = req.params;
    Todos.remove(id, req.vacId)
        .then(deleted => {
            res.status(200).json(deleted);
        }).catch(err => {
            console.log(err)
            res.status(404).json({ message: 'Invalid ID' })
        });
})


//middleware
function validateUserVacLink(req, res, next) {
    const { username } = req.user;
    const { vacId } = req.params;
    Users.findIdFromName(username).then(userId => {
        if (!userId) {
            return res.status(400).json({ Message: 'User with this username does not exist!' })
        }
        UsersVacation.check(userId, vacId).then(validLink => {
            console.log('validelink in valdiateUservac', validLink)
            if (validLink) {
                req.vacId = vacId;
                next();
            } else {
                res.status(403).json({ message: 'You are not authorized to perform this action!' })
            }
        })
            .catch(err => {
                console.log('err 1', err)
                res.status(500).json(err);
            })
    })
        .catch(err => {
            res.status(500).json(err);
        });
}

function validateTodoById(req, res, next) {
    const { id } = req.params;
    Todos.findById(id).then(comment => {
        if (!comment.length) {
            return res.status(400).json({ message: 'Todo with this id does not exist' })
        } else {
            next();
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ err: 'Error finding todo' })
    })

}

module.exports = router;