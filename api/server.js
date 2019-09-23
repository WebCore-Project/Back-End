const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const addVacRouter = require('../vacations/vacation-router.js');
const vacationRouter = require('../user-vacations/user-vacation-router.js');
const usersRouter = require('../users/users-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/vacations', addVacRouter);
server.use('/api/usersvacations', vacationRouter);
server.use('/api', usersRouter);

module.exports = server;