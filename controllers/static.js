const URL = require('../models/url');

async function handleHomePage(req, res) {
    if(!req.user) return res.redirect('/')
    
    const urlList = await URL.find({ createdBy: req.user._id });
    return res.render('home', {urlList: urlList});
}

module.exports = {
    handleHomePage,
}