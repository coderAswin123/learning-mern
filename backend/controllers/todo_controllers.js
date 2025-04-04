const asyncHandler = require('express-async-handler');
const Todo = require('../models/todo_schema');
const User = require('../models/user_schema');

const getTodo = asyncHandler(async (request, response) => {
    const todo = await Todo.find({user: request.user.id});
    response.status(200).json(todo);
});

const setTodo = asyncHandler(async (request, response) => {
    if (!request.body.text) {
        response.status(400);
        throw new Error('Please add a text in the response');
    }
    const todo = await Todo.create({
        text: request.body.text,
        user: request.user.id,
    });
    response.status(200).json(todo);
});

const updateTodo = asyncHandler(async (request, response) => {

    const user = await User.findById(request.user.id);

    if(!user){
        response.status(401);
        throw new Error('Invalid User')
    }


    const todo = await Todo.findById(request.params.id);

    if (!todo) {
        response.status(400);
        throw new Error('Todo item not found');
    }


    if(todo.user.tostring() != user.id){
        response.status(401);
        throw new Error('User is not authorized to access this Todo Item');
    }

    const updatedTodo = await Todo.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
    });

    response.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (request, response) => {

    const user = await User.findById(request.user.id);

    if(!user){
        response.status(401);
        throw new Error('Invalid User')
    }

    const todo = await Todo.findById(request.params.id);

    if (!todo) {
        response.status(400);
        throw new Error('Todo item not found');
    }

    if(todo.user.tostring() != user.id){
        response.status(401);
        throw new Error('User is not authorized to access this Todo Item');
    }
    
    await Todo.findByIdAndDelete(request.params.id);

    response.status(200).json({
        message: 'Deleting following id',
        id: request.params.id
    });
});

module.exports = {
    getTodo,
    setTodo,
    updateTodo,
    deleteTodo
};