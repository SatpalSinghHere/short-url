const { getUser } = require('../services/auth')

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies.sessionId

    if(!userUid) return res.redirect('/');

    const user = getUser(userUid);

    if(!user) return res.redirect('/');

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies.sessionId   

    const user = getUser(userUid);    

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}