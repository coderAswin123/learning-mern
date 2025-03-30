const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: {
        type: string,
        required: [true, 'Please add a name'],
    },

    email: {
        type: string,
        required: [true, 'Please add an email'],
        unique: true,
    },

    password: {
        type: string,
        required: [true, 'Please enter a password'],
    },
    
    timestamps: true,

})

modules.export = mongoose.models('user',userSchema);