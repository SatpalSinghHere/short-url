const express = require('express');
const router = express.Router();

const {handleUserSignup, handleGetSignupPage, handleUserLogIn, handleGetUserLoginPage} = require('../controllers/user');

router.route('/signup')
    .get(handleGetSignupPage)
    .post(handleUserSignup);

router.route('/')
    .post(handleUserLogIn)
    .get(handleGetUserLoginPage);

module.exports = router;