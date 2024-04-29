const express = require('express');
const router = express.Router();
const { handleHomePage } = require('../controllers/static');

router.get('/', handleHomePage);

module.exports = router;