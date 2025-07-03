
const express = require('express');
const router = express.Router();
const {ShortUrl} = require('../Controllers/url');

router.post('/url', ShortUrl);

module.exports = router;