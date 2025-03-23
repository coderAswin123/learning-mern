const express = require('express');
const { errorHandler } = require('./backend/middleware/error_middleware');
const port = 5000;

const app = express();

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use('/api/todos', require('./backend/routs/todo_routes'))

app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`);
});