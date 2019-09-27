const Users = require('./users-model.js');
const db = require('../database/db-config.js');

describe('users model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('add', () => {
        it('should add users', async () => {
            const user = {username: "Tom", password:"pass"}
            const user1 = {username: "Jerry", password:"test"}
            await Users.add(user);
            await Users.add(user1);

            const saved = await db('users')
            expect(saved).toHaveLength(2)
        })
        it('should add users and find users', async () => {
            const user3 = {username: "Tom", password:"testing"}
            const user4 = {username: "Jerry", password:"testing"}
            await Users.add(user3);
            await Users.add(user4);
            const savedFromDB = await db('users').where({'id': 1}).first()
            const savedFromModel = await Users.findById(1)
            expect(savedFromDB).toEqual(savedFromModel)
        })
    })

});