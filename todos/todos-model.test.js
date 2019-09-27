const Todos = require('./todos-model.js');
const db = require('../database/db-config.js');

describe('todos model', () => {
    beforeEach(async () => {
        await db('todo').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    
    describe('add', () => {
        it('should add suggestion', async () => {
            await Todos.add(1,1,'testing suggestion');
            await Todos.add(2,2,'testing suggestion');

            const saved = await db('todo')
            expect(saved).toHaveLength(2)
        })
        it('should add suggestion and find suggestion', async () => {
            const id = await Todos.add('testing suggestion',2,2);
            await Todos.add(1,1,'testing suggestion 2');
            const savedFromDB = await db('todo').where({'id': 1}).select('suggestion')
            const savedFromModel = await Todos.findById(1)
            expect(savedFromDB).toEqual(savedFromModel)
        })
    })
    describe('remove', () => {
        it('should remove suggestion', async () => {
            const [id] = await Todos.add(1, 1, "test");
            const saved = await db('todo')
            expect(saved).toHaveLength(1)
            await Todos.remove(1,1)
            const deleted = await db('todo')
            expect(deleted).toHaveLength(0)
        })
    })
   
});