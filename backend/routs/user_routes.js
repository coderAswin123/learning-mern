const express = require('express');
const router = express.Router();

const {registerUser, loginUser, getLoggedInUser } = require('../controllers/user_controller');

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(getLoggedInUser)


module.exports = router;
    