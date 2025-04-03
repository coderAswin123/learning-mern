const express = require('express');
const router = express.Router();
const {protection} = require('../middleware/authorization_middleware')

const {registerUser, loginUser, getLoggedInUser } = require('../controllers/user_controller');

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
//router.route('/me').get(getLoggedInUser)
router.get("/me",protection,getLoggedInUser);

module.exports = router;
    