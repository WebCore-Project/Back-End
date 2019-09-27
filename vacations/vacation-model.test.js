const Vacations = require('./vacation-model.js');
const db = require('../database/db-config.js');

describe('vacations model', () => {
    beforeEach(async () => {
        await db('vacations').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    describe('add', () => {
        it('should add vacations', async () => {
            const vac = {title: "test", location: "test"}
            await Vacations.add(vac);
            await Vacations.add(vac);

            const saved = await db('vacations')
            expect(saved).toHaveLength(2)
        })
        it('should add vacations and find vacations', async () => {
            const vac = {title: "test", location: "test"}
            const id = await Vacations.add(vac);
            await Vacations.add(vac);
            const savedFromDB = await db('vacations').where({'id': 1}).first()
            const savedFromModel = await Vacations.findById(1)
            expect(savedFromDB).toEqual(savedFromModel)
        })
    })
    describe('remove', () => {
        it('should remove vacations', async () => {
            const vac = {title: "test", location: "test"}
            await Vacations.add(vac);
            await Vacations.add(vac);
            const saved = await db('vacations')
            expect(saved).toHaveLength(2)
            await Vacations.remove(1)
            const deleted = await db('vacations')
            expect(deleted).toHaveLength(1)
        })
    })

});