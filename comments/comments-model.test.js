const Comments = require('./comments-model.js');
const db = require('../database/db-config.js');

describe('comments model', () => {
    beforeEach(async () => {
        await db('vacation_comments').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
    
    describe('add', () => {
        it('should add comment', async () => {
            await Comments.add(1,1,'testing comment');
            await Comments.add(2,2,'testing comment');

            const saved = await db('vacation_comments')
            expect(saved).toHaveLength(2)
        })
        it('should add comment and find comment', async () => {
            const id = await Comments.add('testing comment',2,2);
            await Comments.add(1,1,'testing comment 2');
            const savedFromDB = await db('vacation_comments').where({'id': 1}).select('comments')
            const savedFromModel = await Comments.findById(1)
            expect(savedFromDB).toEqual(savedFromModel)
        })
    })
    describe('remove', () => {
        it('should remove comment', async () => {
            const [id] = await Comments.add(1, 1, "test");
            const saved = await db('vacation_comments')
            expect(saved).toHaveLength(1)
            await Comments.remove(1,1)
            const deleted = await db('vacation_comments')
            expect(deleted).toHaveLength(0)
        })
    })
   
});