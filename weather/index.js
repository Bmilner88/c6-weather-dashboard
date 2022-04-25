const express = require('express');
const router = express.Router();
const API_KEY = process.env.API_KEY;

router.get('/', (req, res) => {
    res.sendFile('../public/index.html');
});

module.exports = router;