var express = require('express');
var router = express.Router();

const { Movies } = require('../domain/movies/movies');

router.get('/:moviesId', async function (req, res) {
  const movies = await Movies.find_by_id(req.params.moviesId);
  
  if (!movies.id) {
    res.status(404).json({"error": "Movie not found"});
    return;
  }
  res.json(movies);
});

module.exports = router;