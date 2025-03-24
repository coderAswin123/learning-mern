const asyncHanlder = require('express-async-handler');

const Todo = require('../models/todo_models');  

const getTodo = asyncHanlder(async(request, response) => {
    response.set(200).json({message: 'Getting Todos', });
})

const setTodo = asyncHanlder(async (request, response) => {
    if(!request.body.text) {
        response.status(400);
        throw new Error('Please add a text in the response');
    }
    const todo = await Todo.create({
        text : request.body.text,
    });
    response.set(200).json(todo);
})

const updateTodo = asyncHanlder(async(request, response) => {
    response.set(200).json({message: 'Updating Todos'});
})


const deleteTodo = asyncHanlder(async (request, response) => {
    response.set(200).json({message: 'Deleting Todos'});
})

module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
}