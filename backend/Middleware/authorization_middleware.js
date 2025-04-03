const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user_schema');
const { request } = require('express');

const protection = asyncHandler(async(req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decodedToken.id).select("-password");
            
            next();
        } catch(error){
            console.log(error);
            res.status(401);
            throw new Error("Not Authorized");
        }
    }


    if(!token){
        res.status(401);
        throw new Error("Bearer Token not found");
    }
});

module.exports = {
    protection,
};