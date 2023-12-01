var express = require('express');
var router = express.Router();

const { Genre } = require('../domain/genre/genre');

router.get('/', async function (req, res) {
    const genres = await Genre.get_all();
    res.json(genres);
});

module.exports = router;