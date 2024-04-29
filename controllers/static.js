const URL = require('../models/url');

async function handleHomePage(req, res) {
    const urlList = await URL.find();
    return res.render('home', {urlList: urlList});
}

module.exports = {
    handleHomePage,
}