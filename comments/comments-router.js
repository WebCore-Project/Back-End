const router = require('express').Router({mergeParams:true});
const Users = require('../users/users-model.js');
const restricted = require('../auth/auth-middleware.js');
const UsersVacation = require('../user-vacations/user-vacation-model.js')
const Comments = require('./comments-model.js');

router.post('/add', restricted, validateUserVacLink, (req, res) => {
    const { comment} = req.body;
    const username = req.user;
    if (!comment) {
        return res.status(400).json({ message: 'Comment required!' });
    }
    Users.findIdFromName(username).then(userId => {
        Comments.add(userId, req.vacId, comment).then(userVacID => {
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
    Comments.find(req.vacId).then(comments => {
        console.log('here',comments.length)
        if(comments.length) {
            res.status(200).json(comments)
        } else {
            return res.status(400).json({message: 'No comments found!'})
        }
    })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.delete('/:id/delete', restricted, validateUserVacLink, validateCommentLink, (req, res) => {
    const { id } = req.params;
    Comments.remove(id, req.vacId)
        .then(deleted => {
            res.status(200).json(deleted);
        }).catch(err => {
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

function validateCommentLink(req, res, next) {
    const { id } = req.params;
    Comments.findById(id).then(comment => {
        if (!comment.length) {
            return res.status(400).json({ message: 'Comment with this id does not exist' })
        } else {
            next();
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ err: 'Error finding comment' })
    })

}

module.exports = router;