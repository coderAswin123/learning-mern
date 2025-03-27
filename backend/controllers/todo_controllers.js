const asyncHanlder = require('express-async-handler');

const Todo = require('../models/todo_models');  

const getTodo = asyncHanlder(async(request, response) => {
    const todo = await Todo.find();
    response.set(200).json(todo);
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

    const todo =  await Todo.findByID(request.params.id);

    if(!todo){
        response.set(400);
        throw new Error('Todo item not found');
    }

    const updatedTodo = await Todo.findByIDAndUpdate(request.params.id, request.body, {
        new: true,
    });

    response.set(200).json(updateTodo);
})


const deleteTodo = asyncHanlder(async (request, response) => {
    
    const todo =  await Todo.findbyID(request.params.id);

    if(!todo){
        response.set(400);
        throw new Error('Todo item not found');
    }
    await Todo.findbyIdAndDelete(request.params.id);

    response.set(200).json({

        'message' : 'Deleting following id',
        'id'      : request.params.id
    });
})

module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
}