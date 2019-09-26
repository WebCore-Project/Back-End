const UsersVacation = require('./user-vacation-model.js');
const db = require('../database/db-config.js');

describe('todos model', () => {
    beforeEach(async () => {
        await db('todo').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
});