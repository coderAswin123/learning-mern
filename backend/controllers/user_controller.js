const asyncHandler = require('express-async-handler');
const user = require('../models/user_schema');

const registerUser = (req,res) => {
    res.json({
        message: 'register user',
    });
};

const loginUser = (req,res) => {
    res.json({
        message: 'login user',
    });
};

const getLoggedInUser = (req,res) => {
    res.json({
        message: 'logged in user details',
    });
};

module.exports = {

    registerUser,
    loginUser,
    getLoggedInUser,
}