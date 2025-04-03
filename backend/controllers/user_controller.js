const asyncHandler = require('express-async-handler');
const User = require('../models/user_schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');

const generateToken = (id) => {
    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        },

    );
};

const registerUser = asyncHandler(async(request,response) => {
    const {name, email, password} = request.body; 

    if(!name || !email || !password) {
        response.status(400);
        throw new Error("please add all the required fields");
    }   

    const salt = await bcrypt.genSalt(10); // hjgkk

    const hashedPassword = await bcrypt.hash(password, salt); // pass123 + hjgkk =  hjgkkbuiserguqabiubuibvcutvtukkcvtuv

    const user = await User.create({

        name,
        email,
        password: hashedPassword,
    })

    if(user){
        response.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    }
});

const loginUser = asyncHandler(async(request,response) => {
    const {mail , password} = request.body;

    if(!email || !password){
        response.status(400);
        throw new Error("Please enter both email and password");
    }
    const user = await user.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        response.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    }
    else{
        response.status(400);
        throw new Error("Invalid user credentials");
    }

});

const getLoggedInUser =asyncHandler(async(req,res) => {
    const user = await User.find();
    res.json(user);
});

module.exports = {

    registerUser,
    loginUser,
    getLoggedInUser,
}
