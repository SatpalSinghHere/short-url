const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId : {
        type: String,
        required: true,
    },
    redirectUrl : {
        type: String,
        required: true
    },
    visitHistory : [{timestamp : {type: Number}}],

})

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;