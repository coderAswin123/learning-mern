const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        text : {
            type: String,
            required: [true, 'Please add a text value'],
        },
    
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref : 'user',
        }
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Todo', todoSchema);