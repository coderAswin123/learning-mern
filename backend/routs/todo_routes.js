const express = require('express');
const router = express.Router();
const {protection} = require('../middleware/authorization_middleware');

const { getTodo, setTodo, updateTodo, deleteTodo } = require('../controllers/todo_controllers');

router.route('/').get(protection,getTodo).post(protection,setTodo)
router.route('/:id').put(protection,updateTodo).delete(protection,deleteTodo)

module.exports = router;