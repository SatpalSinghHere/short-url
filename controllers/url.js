const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortId (req, res) {
    const redirectUrl = req.body.url;
    const shortId = shortid.generate();
    console.log("redirectUrl:", redirectUrl);
    console.log("shortid:", shortId);

    await URL.create({
        shortId : shortId,
        redirectUrl : redirectUrl,
        visitHistory : []
    })

    return res.render("home", {
        id : shortId
    });
}

async function handleRedirectUrl (req, res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId : shortId},
        {$push : {visitHistory : {timestamp : Date.now()}}},
    )

    res.redirect(entry.redirectUrl);
}

async function handleDeleteUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndDelete({shortId : shortId});

    res.send("Deleted successfully");
}

module.exports = {
    handleGenerateNewShortId,
    handleRedirectUrl,
    handleDeleteUrl
}
