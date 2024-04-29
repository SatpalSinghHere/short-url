const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser} = require('../services/auth')

async function handleGetSignupPage(req, res){
    return res.render('signup');
}

async function handleUserSignup(req, res) {
    const body = req.body;
    const doc = User.exists({email: body.email});
    if (doc == undefined) {
        return res.render('signup', {error : 'Email already exists!'})
    }
    const user = await User.create({
        name: body.name,
        email: body.email,
        password: body.password
    });
    return res.render('login', {message: 'User created successfully!'})

}

async function handleGetUserLoginPage (req, res) {
    return res.render('login');
}

async function handleUserLogIn(req, res) {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.redirect('/')
    }
    const user = await User.findOne({email, password});
    if (!user) {
        return res.redirect('/')
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("sessionId", sessionId);
    return res.redirect('/home');
    
}

module.exports = {
    handleUserSignup,
    handleGetSignupPage,
    handleGetUserLoginPage,
    handleUserLogIn
}