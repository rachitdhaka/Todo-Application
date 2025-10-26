const { Router } = require("express");
const { UserModel, TodoModel } = require("../database/db");
const JWT = require('jsonwebtoken');
const jwtkey = process.env.JWT_KEY;
const TodoRouter = Router();
const { authMiddleware } = require('../Auth/auth')


TodoRouter.get('/view', authMiddleware, async (req, res) => {
    const Id = req.userId;

    try {
        const todoList= await TodoModel.find({userId: Id});
        res.json({todoList});
    } catch (e) {
         console.error('Error fetching todos', e);
        res.status(500).json({ message: 'Error fetching todos' });
    }
})

TodoRouter.post('/create', authMiddleware, async (req, res) => {

    try {
        const Id = req.userId;
        const { title, description ,  priority } = req.body;
        await TodoModel.create({ title, description, priority, userId: Id })

        res.json({ message: "Todo Created" });
    }catch(e){
        console.log(e);
        res.status(403).json({message : "Error in creating todo"})
    }

})

TodoRouter.delete('/delete', authMiddleware, async (req, res) => {
    const todoId = req.body.id;
    const userId = req.userId;

    try {
        await TodoModel.findOneAndDelete({ _id: todoId, userId });
        res.json({ message: "Todo Deleted" });
    } catch (e) {
        console.error('Error deleting todo', e);
        res.status(500).json({ message: 'Error deleting todo' });
    }
})


TodoRouter.put('/update', authMiddleware, async (req, res) => {
    const todoId = req.body.id;
    const userId = req.userId;
    const { title, description, priority, done } = req.body;

    try {
        await TodoModel.findOneAndUpdate(
            { _id: todoId, userId },
            { title, description, priority, done },
            { new: true }
        );
        res.json({ message: "Todo Updated" });
    } catch (e) {
        console.error('Error updating todo', e);
        res.status(500).json({ message: 'Error updating todo' });
    }
})

module.exports = {
    TodoRouter
}
