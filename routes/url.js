const express = require('express');
const router = express.Router();
const URL = require('../models/url');

const { handleGenerateNewShortId, handleRedirectUrl, handleDeleteUrl } = require('../controllers/url');

router.route('/')
    .post(handleGenerateNewShortId);

router.route('/:shortId')
    .get(handleRedirectUrl)
    .delete(handleDeleteUrl);

module.exports = router;
