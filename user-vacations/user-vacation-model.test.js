const UsersVacation = require('./user-vacation-model.js');
const db = require('../database/db-config.js');

describe('user-vacation model', () => {
    beforeEach(async () => {
        await db('users_vacation').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('add', () => {
        it('should add link', async () => {
            await UsersVacation.add(1,1);
            await UsersVacation.add(2,2);

            const saved = await db('users_vacation')
            expect(saved).toHaveLength(2)
        })
        it('should add link and find link', async () => {
            const id = await UsersVacation.add(2,2);
            await UsersVacation.add(1,1);
            const savedFromDB = await db('users_vacation').where({'id': 1})
            const savedFromModel = await UsersVacation.findById(1)
            expect(savedFromDB).toEqual(savedFromModel)
        })
    })
    describe('remove', () => {
        it('should remove link', async () => {
            const [id] = await UsersVacation.add(1, 1, "test");
            const saved = await db('users_vacation')
            expect(saved).toHaveLength(1)
            await UsersVacation.remove(1,1)
            const deleted = await db('users_vacation')
            expect(deleted).toHaveLength(0)
        })
    })

});